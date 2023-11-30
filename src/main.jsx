import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Route from "./Route/Route.jsx";
import AuthProvider from "./Component/Provider/AuthProvider.jsx";
import {HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <div className="">
        <AuthProvider>
          <RouterProvider router={Route} />
        </AuthProvider>
        <Toaster />
      </div>
    </HelmetProvider>
  </React.StrictMode>
);
