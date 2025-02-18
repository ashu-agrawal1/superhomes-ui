import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store"; // Import store and persistor
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Toaster />
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
