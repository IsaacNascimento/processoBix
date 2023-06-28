import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  loginReducer,
  empresaReducer,
  notificacoesReducer,
  jsonplaceholderReducer
} from "../../redux/reducers";

const reducer = combineReducers({
  login: loginReducer,
  empresa: empresaReducer,
  notificacoes: notificacoesReducer,
  fakeApi: jsonplaceholderReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
