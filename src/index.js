import React from "react";
import ReactDOM from "react-dom";

import ProwlFinder from "./ProwlFinder";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

ReactDOM.render(
  <ProwlFinder />,
  document.getElementById("root")
);

serviceWorker.unregister();
