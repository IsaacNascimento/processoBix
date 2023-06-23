import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  loginReducer,
  exemploReducer,
  notificacoesReducer,
} from "../../redux/reducers";

const reducer = combineReducers({
  login: loginReducer,
  exemplo: exemploReducer,
  notificacoes: notificacoesReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
