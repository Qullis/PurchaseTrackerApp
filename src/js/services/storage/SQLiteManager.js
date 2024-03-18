

class SQLiteDatabaseManager {
    constructor(dbName) {
        this.db = null;
        this.dbName = dbName;
    }

    openDatabase = async (dbName) => {
        this.dbName = 'test3';
        if (dbName) {
            this.dbName = dbName;
        };
        this.db = window.sqlitePlugin.openDatabase({ name: this.dbName, location: 'default' });
        const transactionPromise = new Promise((resolve, reject) => {
            this.db.transaction(async function (tx) {

                tx.executeSql(`CREATE TABLE IF NOT EXISTS userPurchases (id, purchaseName, cost, reciept, PurchaseCreatedDate, purchaseDate, categoryId)`);
                tx.executeSql(`CREATE TABLE IF NOT EXISTS userCategories (id, categoryName, description)`);
                tx.executeSql(`CREATE TABLE IF NOT EXISTS userLastUsedIds (lastUsedPurchaseId, lastUsedCategoryId)`);
                tx.executeSql(`INSERT INTO userLastUsedIds (lastUsedPurchaseId, lastUsedCategoryId) SELECT 0, 0 WHERE NOT EXISTS (SELECT * FROM userLastUsedIds);`);
            }, function (error) {
                reject(error);
            }, function () {
                console.log('createOpenTables: transaction ok');
                resolve(true);
            });
        }).catch(function (error) {
            console.log('createopen error: ' + error.message);
        });
        return await transactionPromise;
    };

    addItem = async (item, lastUsedId) => {

        this.db.transaction(function (tx) {

            if (item.purchaseName && lastUsedId) {
                const purchaseQuery = "INSERT INTO userPurchases (id, purchaseName, cost, reciept, PurchaseCreatedDate, purchaseDate, categoryId) VALUES (?,?,?,?,?,?,?)";
                const lastIdsQuery = "UPDATE userLastUsedIds SET lastUsedPurchaseId = ?"
                tx.executeSql(purchaseQuery, [item.id, item.purchaseName, item.cost, item.reciept, item.PurchaseCreatedDate, item.purchaseDate, item.categoryId], function (tx, res) {
                    console.log("insertId: " + res.insertId + " -- probably 1");
                    console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                });
                tx.executeSql(lastIdsQuery, [lastUsedId], function (tx, res) {
                    console.log("insertId: " + res.insertId + " -- probably 1");
                    console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                });
            }
            else if (item.categoryName && lastUsedId) {
                const categoryQuery = "INSERT INTO userCategories (id, categoryName, description) VALUES (?,?,?)";
                const lastIdsQuery = "UPDATE userLastUsedIds SET lastUsedCategoryId =?"
                tx.executeSql(categoryQuery, [item.id, item.categoryName, item.description], function (tx, res) {
                    console.log("insertId: " + res.insertId + " -- probably 1");
                    console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                });
                tx.executeSql(lastIdsQuery, [lastUsedId], function (tx, res) {
                    console.log("insertId: " + res.insertId + " -- probably 1");
                    console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                });
            }
            else {
                throw new Error("Data validation failed, incorrect or no data provided");
            }
        }, function (error) {
            console.log('additem error: ' + error.message);
        }, function () {
            console.log('additem: transaction ok');
        });
    }

    getData = async () => {
        let data = {};
        let purchases = [];
        let categories = [];
        let lastUsedIds = [];
        const transactionPromise = new Promise((resolve, reject) => {
            this.db.transaction(function (tx) {
                const purchaseQuery = "SELECT id, purchaseName, cost, reciept, PurchaseCreatedDate, purchaseDate, categoryId FROM userPurchases";
                const categoryQuery = "SELECT id, categoryName, description FROM userCategories"
                const lastIdsQuery = "SELECT lastUsedPurchaseId, lastUsedCategoryId FROM userLastUsedIds"
                //get purchases from the database
                tx.executeSql(purchaseQuery, undefined, function (tx, resultSet) {
                    if (resultSet.rows.length > 0) {
                        for (let i = 0; i < resultSet.rows.length; i++) {
                            purchases.push(resultSet.rows.item(i));
                            console.log(resultSet.rows.item(i));
                        };
                    }
                    else {
                        console.log("no data found");
                    }
                });
                //get categories from the database
                tx.executeSql(categoryQuery, undefined, function (tx, resultSet) {
                    if (resultSet.rows.length > 0) {
                        for (let i = 0; i < resultSet.rows.length; i++) {
                            categories.push(resultSet.rows.item(i));
                            console.log(resultSet.rows.item(i));
                        };
                    }
                    else {
                        console.log("no data found");
                    }
                });
                //get last used ids from the database
                tx.executeSql(lastIdsQuery, undefined, function (tx, resultSet) {
                    if (resultSet.rows.length > 0) {
                        lastUsedIds.push(resultSet.rows.item(0));
                    }
                    else {
                        console.log("no data found");
                        //should always be data, because we add on db open if not exists, therefore throw error if not exists
                        throw new Error("Something went wrong loading data from storage");
                    }
                });
                data.purchases = purchases;
                data.categories = categories;
                data.lastUsedIds = lastUsedIds;
            }, function (error) {
                reject(error);
            }, function () {
                console.log('getData: transaction ok');
                resolve(data);
            });
        }).catch(function (error) {
            console.log('Error loading data from storage:  ' + error.message);
            data = false;
        });
        return await transactionPromise;

    }

    removeItem = async (id, info) => {
        const transactionPromise = new Promise((resolve, reject) => {
            let result = false;
            this.db.transaction(function (tx) {
                if (id && info === 'purchase') {
                    var query = "DELETE FROM userPurchases WHERE id = ?";

                    tx.executeSql(query, [id], function (tx, res) {
                        console.log("removeId: " + res.insertId + " -- probably 1");
                        console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                        result = true;
                    });
                }
                else if (id && info === 'category') {
                    var query = "DELETE FROM userCategories WHERE id =?";
                    tx.executeSql(query, [id], function (tx, res) {
                        console.log("removeId: " + res.insertId + " -- probably 1");
                        console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                        result = true;
                    });
                }
                else {
                    throw new Error("Could not delete; check passed parameters");
                }
            }, function (error) {
                reject(error)
            }, function () {
                console.log('transaction ok');
                resolve(result);
            });
        }).catch((error) => {
            console.log('Error removing data from storage: ' + error.message);
        });
        return await transactionPromise;
    }

    updateItem = async (item) => {
        const transactionPromise = new Promise((resolve, reject) => {
            let result = false;
            this.db.transaction(function (tx) {
                if (item && item.id) {
                    var query = "UPDATE userPurchases SET purchaseName = ?, cost = ?, reciept = ?, PurchaseCreatedDate = ?, purchaseDate = ?, categoryId = ? WHERE id = ?";

                    tx.executeSql(query, [item.purchaseName, item.cost, item.reciept, item.PurchaseCreatedDate, item.purchaseDate, item.categoryId, item.id], function (tx, res) {
                        console.log("update insertId: " + res.insertId);
                        console.log("update rowsAffected: " + res.rowsAffected);
                        console.log("update res: " + JSON.stringify(res));
                        result = true;
                    });
                }
                else {
                    throw new Error("Data validation failed, incorrect or no data provided");
                }

            }, function (error) {
                reject(error);
            }, function () {
                console.log('update transaction ok: ');
                resolve(result);
            });
        }).catch((error) => {
            console.log('Error updating data in storage: ' + error.message);
        });
        return await transactionPromise;
    }

}

export default SQLiteDatabaseManager;