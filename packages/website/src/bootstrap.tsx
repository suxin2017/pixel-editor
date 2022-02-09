import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//@ts-ignore
// const RemoteButton = React.lazy(() => import("remote/Button"));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
