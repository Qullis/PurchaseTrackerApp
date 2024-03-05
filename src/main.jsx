import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//routes/pages
import Root from './js/routes/Root';
import Index, {loader as indexLoader} from './js/routes/Index';
import AllPurchasesPage, {loader as allPurchasesLoader} from './js/routes/AllPurchasesPage';
import PurchasesByCategoryPage, {loader as purchasesByCategoryLoader} from './js/routes/PurchasesByCategoryPage';
import AddNewCategoryPage, {action as addCategoryAction} from './js/routes/AddNewCategoryPage';

//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
//Bootstrap bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//capacitor specific code
import './js/App'
//PurchaseService for handling data storage
import { purchaseService } from './js/routes/Root';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      { 
        index: true, 
        element: <Index />, 
        loader: indexLoader,
      },
      {
        path: "purchases/read/all",
        element: <AllPurchasesPage />,
        loader: allPurchasesLoader,
      },
      {
        path: "purchases/read/:categoryId",
        element: <PurchasesByCategoryPage />,
        loader: purchasesByCategoryLoader,
      },
      {
        path: "categories/add",
        element: <AddNewCategoryPage />,
        action: addCategoryAction,
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
