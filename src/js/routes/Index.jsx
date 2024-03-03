import { Link } from "react-router-dom";

const Index = ({purchaseService}) => {


    return (
        <>
            <div className="card text-center m-2">
                <div className="card-header">
                    Category
                </div>
                <div className="card-body">
                    <h5 className="card-title">Medical</h5>
                    <p className="card-text text-danger fs-2">2000€</p>
                    <Link to={'purchasesByCategory/read'} className="btn btn-primary">See all purchases</Link>
                </div>
                <div className="card-footer text-muted">
                    Last updated 21.02.2024
                </div>
            </div>
            <div className="card text-center m-2">
                <div className="card-header">
                    Category
                </div>
                <div className="card-body">
                    <h5 className="card-title">Groceries</h5>
                    <p className="card-text text-danger fs-2">1290€</p>
                    <a href="#" className="btn btn-primary">See all purchases</a>
                </div>
                <div className="card-footer text-muted">
                    Last updated 29.02.2024
                </div>
            </div>
            <div className="text-center">
                <Link to={'/'} className="btn btn-primary mx-5 mt-5">Add new Category</Link>
            </div>
            
        </>
    )
}

export default Index