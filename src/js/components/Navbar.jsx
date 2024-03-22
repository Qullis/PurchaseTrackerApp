import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand fs-6">KuBrSoft Purchase Tracker</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item mx-2">
                                <Link className="text-white text-decoration-none nav-link bi bi-house" to={'/'}> - Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="text-white text-decoration-none nav-link bi bi-view-list" to={'purchases/read/custom/all'}> - All purchases</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="text-white text-decoration-none nav-link bi bi-folder-plus" to={'categories/add'}> - Add new category</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="text-white text-decoration-none nav-link bi bi-sliders" to={'app/options'}> - Options</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;