import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import rootReducer, { RootState } from "./reducers/dataReducer";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<RootState>)
);

export default store;
