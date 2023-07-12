import { Action } from "redux";

export interface RootState {
  data: any[];
}

const initialState: RootState = {
  data: [],
};

interface SetDataAction extends Action<"SET_DATA"> {
  payload: any[];
}

type DataActionTypes = SetDataAction;

const dataReducer = (
  state = initialState,
  action: DataActionTypes
): RootState => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
export type { SetDataAction, DataActionTypes };
