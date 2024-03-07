import { Link } from "react-router-dom";


const PurchaseCard = ({ purchase }) => {
    if (purchase.reciept === null) {
        purchase.reciept = '/';
    };

    return (
        <>
            <div className="card">
                <img src={purchase.reciept} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{purchase.purchaseName}</h5>
                    <p className="card-text">{purchase.notes}</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Purchase date: {purchase.purchaseDate}</li>
                        <li className="list-group-item">Created on: {purchase.PurchaseCreatedDate}</li>
                        <li className="list-group-item">Edited on: Never</li>
                    </ul>

                    <Link to={'purchases/update/' + purchase.id} className="btn btn-primary">Edit</Link>
                </div>
            </div>
        </>
    )
};

export default PurchaseCard;