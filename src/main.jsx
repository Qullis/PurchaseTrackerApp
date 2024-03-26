import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//routes/pages + loaders and actions
import Root from './js/routes/Root';
import Index, { loader as indexLoader } from './js/routes/Index';
import OptionsPage, {loader as optionsLoader} from './js/routes/OptionsPage';
import EditPurchasePage, {loader as editPurchaseLoader, action as editPurchaseAction} from './js/routes/editPurchasePage';
import ViewPurchasePage, { loader as viewPurchaseLoader, action as viewPurchasePageAction } from './js/routes/ViewPurchasePage';
import AllPurchasesPage, { loader as allPurchasesLoader } from './js/routes/AllPurchasesPage';
import CategoryOptionsPage, {action as categoryOptionsAction} from './js/routes/CategoryOptionsPage';
import PurchasesByCategoryPage, { loader as purchasesByCategoryLoader } from './js/routes/PurchasesByCategoryPage';
import AddNewCategoryPage, { action as addCategoryAction } from './js/routes/AddNewCategoryPage';
import AddPurchasePage, { action as addPurchaseAction } from './js/routes/AddPurchasePage';

//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
//Bootstrap bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
//capacitor specific code
import './js/App'
//ionic PWA elements for camera
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
import { purchaseService, preferencesManager } from './js/services/services';

const startApp = async () => {
  //initialize services aka load data from local database
  await purchaseService.initialize();
  await preferencesManager.initialize();
  console.log('Initialized');
  //render app using react

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
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
          path: "purchases/:categoryId/:id/read",
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
          path: "purchases/add/:categoryId",
          element: <AddPurchasePage />,
          action: addPurchaseAction,
        },
        {
          path: "purchases/:id/update",
          element: <EditPurchasePage />,
          loader: editPurchaseLoader,
          action: editPurchaseAction,
        },
        {
          path: "categories/add",
          element: <AddNewCategoryPage />,
          action: addCategoryAction,
        },
        {
          path: "categories/options/:categoryId",
          element: <CategoryOptionsPage />,
          action: categoryOptionsAction,
        },
        {
          path: "app/options",
          element: <OptionsPage />,
          loader: optionsLoader,
        }
      ],
    },
  ]);


  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
};
startApp();
