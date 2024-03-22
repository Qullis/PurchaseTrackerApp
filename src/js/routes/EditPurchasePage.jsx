import { Form, redirect, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import { purchaseService, photoService } from "../services/services"


export const loader = async ({ params}) => {
    const { id } = params;
    const purchase = await purchaseService.findPurchaseById(parseInt(id));
    return { purchase };
};

export const action = async ({ params, request }) => {
    const formData = await request.formData();
    const purchase = Object.fromEntries(formData);
    purchase.id = parseInt(purchase.id); // id of the purchase, could also get from params, make sure its an integer
    purchase.categoryId = parseInt(purchase.categoryId); //make sure its an integer
    //change cost to float
    const cost = parseFloat(purchase.cost);
    purchase.cost = cost;
    //if reciept contains .jpeg it has an existing image associated with it, if it is fale it has no image associated with it/or it was deleted, 
    //if it is true it has a new image associated with it
    
    if (!purchase.reciept.includes('.jpeg') && purchase.reciept !='true' ){
        purchase.reciept = false;
    }
    else if (purchase.reciept === 'true') {
        purchase.reciept = true;
    }
    await purchaseService.persistPurchase(purchase);
    return redirect('/');
};

const EditPurchasePage = () => {

    const {purchase} = useLoaderData();
    const [newImageExists, setNewImageExists] = useState(false);
    const [oldImageExists, setOldImageExists] = useState(false);

    useEffect(() => {
        if(purchase.reciept){
            setOldImageExists(true);
            console.log('reciept: ' + purchase.reciept);
            console.log(purchaseService.findAllPurchases());
        }
    },[]);

    const onClickDeleteButton = async () => {
        setOldImageExists(false);
    };
    const onClickPhotoButton = async () => {
        const image = await photoService.takePicture();
        if(image){
            purchaseService.temporaryImageData = image;
            setNewImageExists(true);
        }
    };

    //html needs date in yyyy-mm-dd format when setting default value
    const formatDate = (date) => {
        const dateToConvert = new Date(date);
        const year = dateToConvert.getFullYear();
        const month = String(dateToConvert.getMonth() + 1).padStart(2, '0');
        const day = String(dateToConvert.getDate()).padStart(2, '0');
        const YYYYMMDD = `${year}-${month}-${day}`;
        return YYYYMMDD;
      };


    return (
        <>
            <Form method="post" id="updatePurchaseForm" className="m-2 p-2 border border-1 border-light rounded-4 text-light">
                <input type="text" name="id" value={purchase.id} hidden />
                <input type="text" name="categoryId" value={purchase.categoryId} hidden />
                <div className="mb-3">
                    <label htmlFor="purchaseName" className="form-label">Purchases: </label>
                    <input type="text" className="form-control" id="purchaseName" name="purchaseName" defaultValue={purchase.purchaseName} required maxLength={20} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cost" className="form-label">Cost:</label>
                    <input type="number" className="form-control" id="cost" name="cost" defaultValue={purchase.cost} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="notes" className="form-label">Notes: </label>
                    <textarea className="form-control" id="notes" name="notes" rows="2" defaultValue={purchase.notes}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="purchaseDate" className="form-label">Date of purchase:</label>
                    <input type="date" className="form-control" id="purchaseDate" name="purchaseDate" defaultValue={formatDate(purchase.purchaseDate)} required />
                </div>
                {oldImageExists &&
                <div className="mb-3">
                <label htmlFor="reciept" className="form-label">Reciept:</label>
                <button type="button" className="btn btn-danger d-block mb-2 bi bi-trash" onClick={() => onClickDeleteButton()}>Delete current reciept</button>
                <input type="text" className="form-control" id="reciept" name="reciept" value={purchase.reciept} hidden />
                <div>Purchase has a reciept <i className="bi bi-file-check"></i> If you want to add a new one, delete the current one.</div>
                </div>
                }
                {!oldImageExists &&
                <div className="mb-3">
                    <label htmlFor="reciept" className="form-label">Add a reciept:</label>
                    <button type="button" className="btn btn-secondary d-block mb-2 bi bi-camera" onClick={() => onClickPhotoButton()}> Take picture</button>
                    <input type="text" className="form-control" id="reciept" name="reciept" value={newImageExists} hidden />
                    {!newImageExists && 
                        <div>No reciept added. Take a picture of a reciept to add one.</div>
                    }
                    {newImageExists &&
                        <div>Reciept added <i className="bi bi-file-check"></i></div>
                    }
                    
                </div>

                }
                

                <div className="text-end">
                    <button type="submit" className="btn btn-primary bi bi-floppy"> Save changes</button>
                </div>
            </Form>
        </>
    )
}

export default EditPurchasePage;