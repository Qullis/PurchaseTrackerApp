import { Link } from "react-router-dom";

const CategoryCard = ({category, totalSum, link, lastUpdated, description}) => {


    return (
        <>
            <div className="card text-center m-2">
                <div className="card-header">
                    Category
                </div>
                <div className="card-body">
                    <h5 className="card-title">{category}</h5>
                    <p className="card-text text-danger fs-1">{totalSum}</p>
                    <p>{description}</p>
                    <Link to={link} className="btn btn-primary">See all purchases</Link>
                </div>
                <div className="card-footer text-muted">
                    Last purchase: {new Date(lastUpdated).toLocaleDateString()}
                </div>
            </div>

        </>
    )
}

export default CategoryCard;