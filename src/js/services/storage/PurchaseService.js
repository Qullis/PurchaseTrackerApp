

class PurchaseService {
    constructor() {
        this.purchases = [];
        this.categories = [];
    }
    static lastUsedIdValue = 0;

    static getNextId = () => {
        PurchaseService.lastUsedIdValue = PurchaseService.lastUsedIdValue + 1;
        return PurchaseService.lastUsedIdValue;
    }

    initialize = () => {
        //temporarily add some test data here
        const purchase = {purchaseId: null, purchaseName: 'Insulin', cost: 200, reciept: '', notes: '2 mån förbrukning', noteCreatedDate: new Date().toLocaleDateString, purchaseDate: '22.12.2023', category: 'Medical'}
        this.persist(purchase);
        const purchase2 = {purchaseId: null, purchaseName: 'Ozempic', cost: 120, reciept: '', notes: 'Vasa apotek', noteCreatedDate: new Date().toLocaleDateString, purchaseDate: '01.03.2024', category: 'Medical'}
        this.persist(purchase2);
        const purchase3 = {purchaseId: null, purchaseName: 'Plåster', cost: 10, reciept: '', notes: '', noteCreatedDate: new Date().toLocaleDateString, purchaseDate: '26.11.2023', category: 'Medical'}
        this.persist(purchase3);
        const purchase4 = {purchaseId: null, purchaseName: 'Mat', cost: 55, reciept: '', notes: 'Ost å bulla', noteCreatedDate: new Date().toLocaleDateString, purchaseDate: '21.04.2023', category: 'Groceries'}
        this.persist(purchase4);
    };

    findAll = () => {
        return this.purchases;
    };

    findById = (id) => {
        return this.purchases.find(purchase => purchase.id === id);
    };

    findByCategory = (category) => {
        return this.purchases.filter(purchase => purchase.category === category);
    };

    persist = (purchase) => {
        if (purchase != null) {
            if (purchase.id == null || !purchase.id) {
                //new purchase
                purchase.id = PurchaseService.getNextId();
                this.purchases.push(purchase);
                if (!this.categories.includes(purchase.category)) {
                    //new category
                    this.categories.push(purchase.category);
                }
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
}

export default PurchaseService;