import { useLoaderData } from "react-router-dom";

import PurchaseCard from "../components/PurchaseCard";
import { purchaseService } from "../services/services";


export const loader = async ({params}) => {
    const id = parseInt(params.id);
    const purchase = await purchaseService.findPurchaseById(id);
    return {purchase};
};

const ViewPurchasePage = () => {
    const {purchase} = useLoaderData();

    return (
        <>
            <div className="justify-content-center mx-3 text-center">
                <PurchaseCard purchase={purchase} />
            </div>
            
        </>
    );
};

export default ViewPurchasePage;