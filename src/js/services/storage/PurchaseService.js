import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

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

    initialize = () => {
        //temporarily add some test data here
        const purchase = { id: null, purchaseName: 'Insulin', cost: 200, reciept: false, notes: '2 mån förbrukning', PurchaseCreatedDate: new Date().toLocaleDateString(), purchaseDate: '12.22.2023', categoryId: 1 }
        this.persistPurchase(purchase);
        const purchase2 = { id: null, purchaseName: 'Ozempic', cost: 120, reciept: false, notes: 'Vasa apotek', PurchaseCreatedDate: new Date().toLocaleDateString(), purchaseDate: '03.01.2024', categoryId: 1 }
        this.persistPurchase(purchase2);
        const purchase3 = { id: null, purchaseName: 'Plåster', cost: 10, reciept: false, notes: '', PurchaseCreatedDate: new Date().toLocaleDateString(), purchaseDate: '11.26.2023', categoryId: 1 }
        this.persistPurchase(purchase3);
        const purchase4 = { id: null, purchaseName: 'Mat', cost: 55, reciept: false, notes: 'Ost å bulla', PurchaseCreatedDate: new Date().toLocaleDateString(), purchaseDate: '04.26.2023', categoryId: 2 }
        this.persistPurchase(purchase4);
        const category1 = { id: null, categoryName: 'Medical', description: 'Medical expenses' }
        const category2 = { id: null, categoryName: 'Groceries', description: 'Food expenses' }
        this.persistCategory(category1)
        this.persistCategory(category2)
    };

    findAllPurchases = () => {
        return this.purchases;
    };

    findPurchaseById = (id) => {
        return this.purchases.find(purchase => purchase.id === id);
    };

    findAllCategories = () => {
        return this.categories;
    }

    findPurchaseByCategory = (category) => {
        return this.purchases.filter(purchase => purchase.categoryId === category);
    };

    persistCategory = (category) => {
        if (category != null) {
            if (category.id == null || !category.id) {
                //new category
                category.id = PurchaseService.getNextid();
                this.categories.push(category);
                //this.writeToStorage
            }
            else {
                //update existing category
                const existingCategoryindex = this.categories.findIndex((c) => c.id === category.id);
                if (existingCategoryindex >= 0) {
                    const oldCategory = this.categories[existingCategoryindex];
                    const mergedCategory = { ...oldCategory, ...category }
                    this.categories[existingCategoryindex] = mergedCategory;
                    //this.writeToStorage
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
                purchase.id = PurchaseService.getNextCategoryId();
                let imageUrl = null;
                console.log(purchase.reciept)
                if (purchase.reciept==='true') {
                    //if true then get image data from this.temporaryImageData and save and set the imageUrl, otherwise url is null
                    const imageData = this.temporaryImageData;
                    console.log('got data in manager' + imageData);
                    const image = await this.saveImage(imageData, purchase.id);
                    console.log('saved: ' + image.uri);
                    imageUrl = Capacitor.convertFileSrc(image.uri);
                };
                purchase.reciept = imageUrl;
                this.purchases.push(purchase);
                this.temporaryImageData = null; //remove temp data

                //this.writeToStorage
            }
            else {
                //update existing purchase
                const existingPurchaseindex = thispurchases.findIndex((p) => p.id === purchase.id);
                if (existingPurchaseindex >= 0) {
                    const oldPurchase = this.purchases[existingPurchaseindex];
                    const mergedPurchase = { ...oldPurchase, ...purchase }
                    this.purchases[existingPurchaseindex] = mergedPurchase;
                    //this.writeToStorage
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
            path: 'kubrsoft/data/reciepts/'+fileName,
            data: imageBase64,
            directory: Directory.Data,
            recursive: true
        });
        console.log(savedFile);
        return savedFile;
    };

}

export default PurchaseService;