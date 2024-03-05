
import { Outlet } from "react-router-dom"

import NavBar from "../components/Navbar"

import PurchaseService from '../services/storage/PurchaseService';
const purchaseService = new PurchaseService;

purchaseService.initialize();

const Root = () => {


    return (
        <>
            <div>
                <NavBar />
                <Outlet />
            </div>
            
        </>
    )
}
export {purchaseService}
export default Root;