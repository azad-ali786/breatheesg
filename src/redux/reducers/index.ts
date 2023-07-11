import { combineReducers } from "redux";
import dataReducer from "../data";

const rootReducer = combineReducers({
  data: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
