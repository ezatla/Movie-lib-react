import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "tailwindcss/dist/base.css";
import "./fontawesome";
import { MovieProvider } from "./context/movieContext";

ReactDOM.render(
  <MovieProvider>
    <App />
  </MovieProvider>,
  document.getElementById("root")
);
