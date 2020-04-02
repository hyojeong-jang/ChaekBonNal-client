import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";

import reducer from "../src/reducers/index";
import App from "./App";
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv';
dotenv.config();

const middleware = [];

if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
