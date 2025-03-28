import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthContext from "./contexts/AuthContext";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <AuthContext>
          <App />
        </AuthContext>
      </BrowserRouter>
    </React.StrictMode>
    <Toaster position="top-center" />
  </>
);
