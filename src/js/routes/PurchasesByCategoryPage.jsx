import { Link, useLoaderData } from "react-router-dom";
import { purchaseService } from "./Root";

export const loader = async ({ params }) => {
    const id = parseInt(params.categoryId);
    const purchases = await purchaseService.findPurchaseByCategory(id)
    return {purchases};
  }

const PurchasesByCategoryPage = () => {

    const {purchases} = useLoaderData();
    const purchasesTable = purchases.map((purchase) => {
        return (
            <tr key={purchase.id}>
                <td>&#9432;&emsp;<Link to={'purchases/purchase/' + purchase.id} className="text-white">{purchase.purchaseName}</Link></td>
                <td>{purchase.cost}</td>
                <td>{purchase.purchaseDate}</td>
            </tr>
        )
    });
    return (
        <>
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