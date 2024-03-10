import { Form, redirect } from "react-router-dom";
import { useState } from "react";

import { purchaseService, photoService } from "../services/services"

export const loader = async ({ params}) => {
    const { id } = params;
    let purchase = null;
    let mode = 'new'
    if (id != "new") {
        purchase = await purchaseService.findPurchaseById(parseInt(id));
        mode = 'edit'
    }
    return { purchase, mode };
};

export const action = async ({ params, request }) => {
    const {categoryId} = params;
    const formData = await request.formData();
    const purchase = Object.fromEntries(formData)
    purchase.categoryId = parseInt(categoryId);
    //change cost to float
    const cost = parseFloat(purchase.cost);
    purchase.cost = cost;
    //add creation date to purchase
    purchase.PurchaseCreatedDate = new Date().toLocaleDateString();
    //convert reciept value to boolean (sends ture or false to manager where url is added if true)
    if (purchase.reciept === 'true') {
        purchase.reciept = true;
    } 
    else {
        purchase.reciept = false;
    }
    await purchaseService.persistPurchase(purchase);
    return redirect('/');
};

const AddEditPurchasePage = () => {

    const [imageExists, setImageExists] = useState(false);
    const onClickPhotoButton = async () => {
        const image = await photoService.takePicture();
        if(image){
            purchaseService.temporaryImageData = image;
            setImageExists(true);
        }
    };


    return (
        <>
            <Form method="post" id="newPurchaseForm" className="m-2 p-2 border border-1 border-light rounded-4 text-light">
                <div className="mb-3">
                    <label htmlFor="purchaseName" className="form-label">Purchases: </label>
                    <input type="text" className="form-control" id="purchaseName" name="purchaseName" placeholder="Bandaids/Cat food/Curtains etc." required maxLength={20} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cost" className="form-label">Cost:</label>
                    <input type="number" className="form-control" id="cost" name="cost" placeholder="Price" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="notes" className="form-label">Notes: </label>
                    <textarea className="form-control" id="notes" name="notes" rows="2" placeholder="Optional"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="purchaseDate" className="form-label">Date of purchase:</label>
                    <input type="date" className="form-control" id="purchaseDate" name="purchaseDate" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="reciept" className="form-label">Add a reciept:</label>
                    <button type="button" className="btn btn-secondary d-block mb-2" onClick={() => onClickPhotoButton()}>Take picture</button>
                    <input type="text" className="form-control" id="reciept" name="reciept" value={imageExists} readOnly />
                </div>

                <div className="text-end">
                    <button type="submit" className="btn btn-primary">Add new purchase</button>
                </div>
            </Form>
        </>
    )
}

export default AddEditPurchasePage;