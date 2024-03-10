import { Link, useLoaderData, useParams } from "react-router-dom";
import { purchaseService, preferencesManager } from "../services/services"

export const loader = async () => {
       const purchases = await purchaseService.findAllPurchases(); 
       return {purchases};
};

const localDateTimeFormat = preferencesManager.getPreference('localDateTimeFormat');
const currencyFormat = preferencesManager.getPreference('currency');
const AllPurchasesPage = () => {

    const {filter} = useParams();
    const {purchases} = useLoaderData();
    const purchasesTable = purchases.map((purchase) => {
        return (
            <tr key={purchase.id}>
                <td>&#9432;&emsp;<Link to={'/purchases/purchase/read/' + filter + '/' + purchase.id} className="text-white">{purchase.purchaseName}</Link></td>
                <td>{currencyFormat.format(purchase.cost)}</td>
                <td>{localDateTimeFormat.format(new Date(purchase.purchaseDate))}</td>
            </tr>
        )
    });

    return (
        <>
            <div>
                <table className="table table-striped table-dark">
                    <thead className="table-info">
                        <tr>
                            <th>Purchase</th><th>Cost</th><th>Purchase-date:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchasesTable}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllPurchasesPage;