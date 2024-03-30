import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
<<<<<<< HEAD
          <CssBaseline />
          <StyledEngineProvider injectFirst>
            <App />
=======
          {/* <CssBaseline /> */}
          <StyledEngineProvider injectFirst>
          <App />
>>>>>>> a328159 (design and settings changed)
          </StyledEngineProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
