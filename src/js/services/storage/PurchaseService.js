import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { Dialog } from '@capacitor/dialog';
import SQLiteDatabaseManager from './SQLiteManager';

const sqliteDatabaseManager = new SQLiteDatabaseManager;

class PurchaseService {
    constructor() {
        this.purchases = [];
        this.categories = [];
        this.temporaryImageData = null;
    }
    static lastUsedidValue = 0;
    static lastUsedCategoryIdValue = 0;

    static getNextid = () => {
        PurchaseService.lastUsedidValue = PurchaseService.lastUsedidValue + 1;
        return PurchaseService.lastUsedidValue;
    }

    static getNextCategoryId = () => {
        PurchaseService.lastUsedCategoryIdValue = PurchaseService.lastUsedCategoryIdValue + 1;
        return PurchaseService.lastUsedCategoryIdValue;
    }

    initialize = async () => {
        try {
            await sqliteDatabaseManager.openDatabase('purchaseTracker_DB')
            const data = await sqliteDatabaseManager.getData();
            this.purchases = data.purchases;
            this.categories = data.categories;
            console.log(JSON.stringify(data));
            PurchaseService.lastUsedidValue = data.lastUsedIds[0].lastUsedPurchaseId;
            console.log(data.purchases[0])
            PurchaseService.lastUsedCategoryIdValue = data.lastUsedIds[0].lastUsedCategoryId;


        }
        catch (err) {
            console.log(err);
            //dialog error
        }


    };

    findAllPurchases = () => {
        return this.purchases;
    };

    findPurchaseById = (id) => {
        const found = this.purchases.find(purchase => purchase.id === id);
        return found
    };

    findAllCategories = () => {
        return this.categories;
    }

    findCategoryById = (id) => {
        return this.categories.find(category => category.id === id);
    };

    findPurchasesByCategory = (category) => {
        return this.purchases.filter(purchase => purchase.categoryId === category);
    };

    deletePurchaseById = async (id, info) => {
        try {
            let purchasesCopy = [...this.purchases];
            const index = purchasesCopy.findIndex((purchase) => purchase.id === id);
            purchasesCopy.splice(index, 1);
            await sqliteDatabaseManager.removeItem(id, info);
            this.purchases = purchasesCopy;
            return true;
        } catch (err) {
            return false;
        }
    };

    deleteCategoryById = async (id) => {
        try {
            let categoriesCopy = [...this.categories];
            const index = categoriesCopy.findIndex((category) => category.id === id);
            categoriesCopy.splice(index, 1);
            let purchasesCopy = this.purchases.filter((purchase) => purchase.categoryId != id);
            await sqliteDatabaseManager.removeItem(id, 'category');
            this.categories = categoriesCopy;
            this.purchases = purchasesCopy;
            return true;
        } catch (err) {
            return false;
        }
    };

    persistCategory = async (category) => {
        //add try catch here
        if (category != null) {
            if (category.id == null || !category.id) {
                //new category
                category.id = PurchaseService.getNextCategoryId();
                this.categories.push(category);
                await sqliteDatabaseManager.addItem(category, PurchaseService.lastUsedCategoryIdValue);
            }
            else {
                //update existing category
                const existingCategoryindex = this.categories.findIndex((c) => c.id === category.id);
                if (existingCategoryindex >= 0) {
                    const oldCategory = this.categories[existingCategoryindex];
                    const mergedCategory = { ...oldCategory, ...category }
                    this.categories[existingCategoryindex] = mergedCategory;
                    await sqliteDatabaseManager.updateItem(mergedCategory)
                }
                else {
                    return false;
                };
                return true;
            }
            return false;
        }
    };

    persistPurchase = async (purchase) => {
        if (purchase != null) {
            if (purchase.id == null || !purchase.id) {
                //new purchase
                purchase.id = PurchaseService.getNextid();
                let imageUrl = false;
                if (purchase.reciept === true) {
                    //if true then get image data from this.temporaryImageData and save and set the imageUrl, otherwise url is null
                    const imageData = this.temporaryImageData;
                    const image = await this.saveImage(imageData, purchase.id);
                    imageUrl = Capacitor.convertFileSrc(image.uri);
                };
                purchase.reciept = imageUrl;
                this.purchases.push(purchase);
                this.temporaryImageData = null; //remove temp data

                await sqliteDatabaseManager.addItem(purchase, PurchaseService.lastUsedidValue);
            }
            else {
                //update existing purchase
                const existingPurchaseindex = this.purchases.findIndex((p) => p.id === purchase.id);
                const oldPurchase = this.purchases[existingPurchaseindex];
                if (existingPurchaseindex >= 0) {

                    if (purchase.reciept === true) {
                        //if true then get image data from this.temporaryImageData and save and set the imageUrl
                        const imageData = this.temporaryImageData;
                        const image = await this.saveImage(imageData, purchase.id);
                        const imageUrl = Capacitor.convertFileSrc(image.uri);
                        purchase.reciept = imageUrl;
                    };
                    //if reciept is not true then it's either false or already has an url associated with it
                    this.temporaryImageData = null; //remove temp data

                    const mergedPurchase = { ...oldPurchase, ...purchase }
                    this.purchases[existingPurchaseindex] = mergedPurchase;
                    await sqliteDatabaseManager.updateItem(mergedPurchase);
                }
                else {
                    return false;
                };
            };
            return true;
        };
        return false;
    };

    saveImage = async (imageBase64, purchaseId) => {
        const fileName = Date.now() + '-' + purchaseId + '.jpeg';
        const savedFile = await Filesystem.writeFile({
            path: 'kubrsoft/data/reciepts/' + fileName,
            data: imageBase64,
            directory: Directory.Data,
            recursive: true
        });
        console.log(savedFile);
        return savedFile;
    };

}

export default PurchaseService;