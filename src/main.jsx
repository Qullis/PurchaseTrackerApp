import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//routes/pages
import Root from './js/routes/Root';
import Index from './js/routes/Index';
import AllPurchasesPage from './js/routes/AllPurchasesPage';
import PurchasesByCategoryPage from './js/routes/PurchasesByCategoryPage';

//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
//Bootstrap bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//capacitor specific code
import './js/App'
//PurchaseService for handling data storage
import PurchaseService from './js/services/storage/PurchaseService';
const purchaseService = new PurchaseService;
purchaseService.initialize();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { 
        index: true, 
        element: <Index purchaseService={purchaseService}/> 
      },
      {
        path: "purchases/read",
        element: <AllPurchasesPage />,
      },
      {
        path: "purchasesByCategory/read",
        element: <PurchasesByCategoryPage purchaseService={purchaseService}/>,
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
