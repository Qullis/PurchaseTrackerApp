import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//routes/pages + loaders and actions
import Root from './js/routes/Root';
import Index, {loader as indexLoader} from './js/routes/Index';
import OptionsPage from './js/routes/OptionsPage';
import ViewPurchasePage, {loader as viewPurchaseLoader, action as viewPurchasePageAction} from './js/routes/ViewPurchasePage';
import AllPurchasesPage, {loader as allPurchasesLoader} from './js/routes/AllPurchasesPage';
import PurchasesByCategoryPage, {loader as purchasesByCategoryLoader} from './js/routes/PurchasesByCategoryPage';
import AddNewCategoryPage, {action as addCategoryAction} from './js/routes/AddNewCategoryPage';
import AddEditPurchasePage, {loader as addEditPurchaseLoader, action as addEditPurchaseAction} from './js/routes/AddEditPurchasePage';

//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
//Bootstrap bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
//capacitor specific code
import './js/App'
//ionic PWA elements for camera
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);



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
        path: "purchases/read/custom/:filter",
        element: <AllPurchasesPage />,
        loader: allPurchasesLoader,
      },
      {
        path: "purchases/purchase/read/:categoryId/:id",
        element: <ViewPurchasePage />,
        loader: viewPurchaseLoader,
        action: viewPurchasePageAction,
      },
      {
        path: "purchases/read/:categoryId",
        element: <PurchasesByCategoryPage />,
        loader: purchasesByCategoryLoader,
      },
      {
        path: "purchases/add/:id/:categoryId",
        element: <AddEditPurchasePage />,
        loader: addEditPurchaseLoader,
        action: addEditPurchaseAction,
      },
      {
        path: "purchases/update/:id",
      },
      {
        path: "categories/add",
        element: <AddNewCategoryPage />,
        action: addCategoryAction,
      },
      {
        path: "app/options",
        element: <OptionsPage />,
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
