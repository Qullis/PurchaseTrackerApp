import { Link, useLoaderData, useParams } from "react-router-dom";
import { purchaseService, preferencesManager } from "../services/services";

export const loader = async ({ params }) => {
    const id = parseInt(params.categoryId);
    const purchases = await purchaseService.findPurchaseByCategory(id);
    return { purchases };
}
const PurchasesByCategoryPage = () => {
    const localDateTimeFormat = preferencesManager.getPreference('localDateTimeFormat');
    const currencyFormat = preferencesManager.getPreference('currency');

    const { categoryId } = useParams();
    const { purchases } = useLoaderData();
    const purchasesTable = purchases.map((purchase) => {
        return (
            <tr key={purchase.id}>
                <td>&#9432;&emsp;<Link to={'/purchases/purchase/read/' + purchase.categoryId + '/' + purchase.id} className="text-white">{purchase.purchaseName}</Link></td>
                <td>{currencyFormat.format(purchase.cost)}</td>
                <td>{localDateTimeFormat.format(new Date(purchase.purchaseDate))}</td>
            </tr>
        )
    });
    return (
        <>
            <div className="bg-light text-dark">
                <div>Category</div>
                <div className="text-end">
                    <Link to={'/purchases/add/new/' + categoryId} className="btn btn-dark m-1 fw-bold">+</Link>
                </div>
            </div>
            <div className="my-2">
                <table className="table table-striped table-dark">
                    <thead className="table-info">
                        <tr><th>Purchase: </th><th> Cost: </th><th> Purchase-date:</th></tr>
                    </thead>
                    <tbody>
                        {purchasesTable}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default PurchasesByCategoryPage;