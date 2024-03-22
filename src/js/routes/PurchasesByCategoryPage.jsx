import { Link, useLoaderData, useParams } from "react-router-dom";
import { purchaseService, preferencesManager } from "../services/services";

export const loader = async ({ params }) => {
    const id = parseInt(params.categoryId);
    const purchases = await purchaseService.findPurchasesByCategory(id);
    const category = await purchaseService.findCategoryById(id);
    return { purchases, category };
}
const PurchasesByCategoryPage = () => {
    const localDateTimeFormat = preferencesManager.getPreference('localDateTimeFormat');
    const currencyFormat = preferencesManager.getPreference('currency');

    const { categoryId } = useParams();
    const { purchases, category } = useLoaderData();
    const purchasesTable = purchases.map((purchase) => {
        return (
            <tr key={purchase.id}>
                <td><Link to={'/purchases/' + purchase.categoryId + '/' + purchase.id + '/read'} className="text-white"> - {purchase.purchaseName}</Link></td>
                <td>{currencyFormat.format(purchase.cost)}</td>
                <td>{localDateTimeFormat.format(new Date(purchase.purchaseDate))}</td>
            </tr>
        )
    });
    return (
        <>
            <div className="bg-secondary row mt-1">
                <div className="text-light fs-4 col m-2">
                    <Link to={'/categories/options/' + categoryId} className="text-white text-decoration-none" state={category} >{category.categoryName} <i className="bi bi-gear fs-3"></i></Link>
                </div>
                <div className="text-end col">
                    <Link to={'/purchases/add/' + categoryId} className="btn btn-dark m-1 fw-bold">+</Link>
                </div>
            </div>
            <div className="my-2">
                <table className="table table-dark">
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