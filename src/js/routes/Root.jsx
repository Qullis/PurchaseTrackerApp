
import { Outlet } from "react-router-dom"

import NavBar from "../components/Navbar"

const Root = () => {


    return (
        <>
            <div className="bg-secondary">
                <NavBar />
                <Outlet />
            </div>
            
        </>
    )
}

export default Root