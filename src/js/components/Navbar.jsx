import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand">Purchase Tracker</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item mx-2">
                                <Link className="text-white text-decoration-none" to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="text-white text-decoration-none" to={'purchases/read'}>All purchases</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="text-white text-decoration-none" to={'purchases/add'}>Add new purchase</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="text-white text-decoration-none" to={'app/options'}>Options</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;