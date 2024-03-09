import { Link, useLoaderData, useParams } from "react-router-dom";
import { purchaseService, preferencesManager } from "../services/services";

export const loader = async ({ params }) => {
    const id = parseInt(params.categoryId);
    const purchases = await purchaseService.findPurchaseByCategory(id);
    return { purchases };
}
const localDateTimeFormat = preferencesManager.getPreference('localDateTimeFormat');

const PurchasesByCategoryPage = () => {
    
    const { categoryId } = useParams();
    const { purchases } = useLoaderData();
    const purchasesTable = purchases.map((purchase) => {
        return (
            <tr key={purchase.id}>
                <td>&#9432;&emsp;<Link to={'/purchases/purchase/read/' + purchase.id} className="text-white">{purchase.purchaseName}</Link></td>
                <td>{purchase.cost}</td>
                <td>{localDateTimeFormat.format(new Date(purchase.purchaseDate))}</td>
            </tr>
        )
    });
    return (
        <>
            <div className="text-end">
                <Link to={'/purchases/add/new/' + categoryId} className="btn btn-dark m-1 fw-bold">+</Link>
            </div>
            <div className="my-2">
                <table className="table table-striped table-dark">
                    <thead className="table-info">
                        <tr><th className="bg-light">Purchase: </th><th className="bg-light"> Cost: </th><th className="bg-light"> Purchase-date:</th></tr>
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