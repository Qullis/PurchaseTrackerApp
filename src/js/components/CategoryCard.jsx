import { Link } from "react-router-dom";
import { preferencesManager } from "../services/services";

const CategoryCard = ({ category, totalSum, link, lastUpdated, description, ammountOfPurchases }) => {

    const localDateTimeFormat = preferencesManager.getPreference('localDateTimeFormat');
    const currencyFormat = preferencesManager.getPreference('currency');

    let lastPurchaseElement = 'No purchases added yet.';
    if (lastUpdated != null) {
        lastPurchaseElement = localDateTimeFormat.format(new Date(lastUpdated));
    }
    return (
        <>
            <div className="card text-center m-2">
                <div className="card-header">
                    {ammountOfPurchases} purchases in category
                </div>
                <div className="card-body">
                    <h5 className="card-title">{category}</h5>
                    <p className="card-text text-danger fs-1">{currencyFormat.format(totalSum)}</p>
                    <p>{description}</p>
                    <Link to={link} className="btn btn-primary">See all purchases</Link>
                </div>
                <div className="card-footer text-muted">
                    Last purchase: {lastPurchaseElement}
                </div>
            </div>

        </>
    )
}

export default CategoryCard;