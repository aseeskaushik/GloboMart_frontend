//Jai Shree Ram
//Jai Shree Ram
//Jai Shree Ram
//Jai Shree Ram
//Jai Shree Ram
//Jai Shree Ram
//Jai Shree Ram

import React from "react";
import ReactDOM from "react-dom/client";
import axios from 'axios'
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
axios.defaults.baseURL = 'https://genie-bazaar-backend.vercel.app';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
