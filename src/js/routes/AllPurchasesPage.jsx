import { Link, useLoaderData } from "react-router-dom";
import { purchaseService } from "../services/services"

export const loader = async () => {
       const purchases = await purchaseService.findAllPurchases(); 
       return {purchases};
};

const AllPurchasesPage = () => {

    const {purchases} = useLoaderData();
    const purchasesTable = purchases.map((purchase) => {
        return (
            <tr key={purchase.id}>
                <td>&#9432;&emsp;<Link to={'/purchases/purchase/read/' + purchase.id} className="text-white">{purchase.purchaseName}</Link></td>
                <td>{purchase.cost}</td>
                <td>{purchase.purchaseDate}</td>
                <td>{purchase.categoryId}</td>
            </tr>
        )
    });

    return (
        <>
            <div>
                <table className="table table-striped table-dark">
                    <thead className="table-info">
                        <tr>
                            <th>Purchase</th><th>Cost</th><th>Purchase-date:</th><th>Category</th>
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