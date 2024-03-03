import { Link } from "react-router-dom";

const PurchasesByCategoryPage = ({purchaseService}) => {

    const category = 'Medical'; // hardcoded for now
    const purchases = purchaseService.findByCategory(category);
    const purchasesTable = purchases.map((purchase) => {
        return (
            <tr key={purchase.purchaseId}>
                <td><Link to={'purchases/purchase/' + purchase.purchaseId}>{purchase.purchaseName}</Link></td>
                <td>{purchase.cost}</td>
                <td>{purchase.purchaseDate}</td>
            </tr>
        )
    });
    return (
        <>
            <table className="table table-striped table-dark">
                <thead>
                    <th>Purchase: </th><th> Cost: </th> <th> Purchase-date:</th>
                </thead>
                <tbody>
                    {purchasesTable}
                </tbody>
            </table>
        </>
    )
}

export default PurchasesByCategoryPage;