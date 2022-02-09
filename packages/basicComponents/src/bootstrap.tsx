import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//@ts-ignore
const RemoteButton = React.lazy(() => import("remote/Button"));

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
