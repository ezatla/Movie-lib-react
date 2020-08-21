import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "tailwindcss/dist/base.css";
import "./fontawesome";
import { MovieProvider } from "./context/movieContext";

ReactDOM.render(
  <MovieProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MovieProvider>,
  document.getElementById("root")
);
