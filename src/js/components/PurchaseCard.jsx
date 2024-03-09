import { Link } from "react-router-dom";
import { preferencesManager } from "../services/services";

import RecieptPopupModal from "./RecieptPopupModal";
import icon from "../../assets/icons/card-list.svg";

const localDateTimeFormat = preferencesManager.getPreference('localDateTimeFormat');

const PurchaseCard = ({ purchase }) => {
    if (purchase.reciept === null) {
        purchase.reciept = '/';
    };

    return (
        <>
            <div className="card">
                <img src={icon} className="card-img-top" alt="Icon" width="64" height="64" aria-hidden={true} />
                <div className="card-body">
                    <h5 className="card-title">{purchase.purchaseName}</h5>
                    <p className="card-text">{purchase.notes}</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Purchase date: {localDateTimeFormat.format(new Date(purchase.purchaseDate))}</li>
                        <li className="list-group-item">Created on: {localDateTimeFormat.format(new Date(purchase.PurchaseCreatedDate))}</li>
                        <li className="list-group-item">Edited on: Never</li>
                        <li className="list-group-item"><button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#recieptModal">View reciept</button></li>
                        <li className="list-group-item">
                            <button className="btn btn-danger mx-2">Delete</button>
                            <Link to={'purchases/update/' + purchase.id} className="btn btn-primary mx-2">Edit</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <RecieptPopupModal imgUrl={purchase.reciept}/>
        </>
    )
};

export default PurchaseCard;