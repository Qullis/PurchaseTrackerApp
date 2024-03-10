import { useLoaderData, redirect } from "react-router-dom";
import { Dialog } from '@capacitor/dialog';

import PurchaseCard from "../components/PurchaseCard";
import { purchaseService } from "../services/services";


export const loader = async ({ params }) => {
    const id = parseInt(params.id);
    const purchase = await purchaseService.findPurchaseById(id);
    return { purchase };
};
export const action = async ({ params }) => {
    const id = parseInt(params.id);
    const category = params.categoryId;
    //wait for user confirmation
    const { value } = await Dialog.confirm({
        title: 'Confirm delete',
        message: `Are you sure you want to delete this purchase? This action can not be undone`,
    });
    if (value) {
        //user clicked yes
        const result = await purchaseService.deletePurchaseById(id);
        //check if we redirect to all purchases list or specified category
        if (category === 'all') {
            return redirect('/purchases/read/custom/all');
        }
        return redirect(`/purchases/read/${category}`)
    };
    //user clicked no
    return false;

};

const ViewPurchasePage = () => {
    const { purchase } = useLoaderData();

    return (
        <>
            <div className="justify-content-center mx-3 text-center">
                <PurchaseCard purchase={purchase} />
            </div>

        </>
    );
};

export default ViewPurchasePage;