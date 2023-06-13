import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";
// import "./style.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <React.Fragment> */}
    <App />
    {/* </React.Fragment> */}
  </React.StrictMode>
);
