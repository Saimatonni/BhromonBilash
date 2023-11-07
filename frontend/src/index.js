import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import { TourProvider } from "./context/tourContext";
import { TourDetailsProvider } from "./context/tourDetailsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <TourProvider>
      <TourDetailsProvider>
      <App />
      </TourDetailsProvider>
    </TourProvider>
    </BrowserRouter>
  </React.StrictMode>
);
