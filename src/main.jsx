import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './js/routes/Root';
import HomePage from './js/routes/HomePage';
import PurchasesPage from './js/routes/PurchasesPage';

//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
//Bootstrap bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import './js/App'

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "purchases/read",
        element: <PurchasesPage />,
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
