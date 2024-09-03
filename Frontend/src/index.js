import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FilterProvider } from "./Context/filterProvider";
import { AuthProvider } from "./Context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </AuthProvider>
);
