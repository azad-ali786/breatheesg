import { Action } from "redux";

export interface RootState {
  data: any[];
  savedPosts: any[];
}

const initialState: RootState = {
  data: [],
  savedPosts: [],
};

interface SetDataAction extends Action<"SET_DATA"> {
  payload: any[];
}

interface AddPostAction extends Action<"ADD_POST"> {
  payload: any;
}

type DataActionTypes = SetDataAction | AddPostAction;

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
    case "ADD_POST":
      return {
        ...state,
        savedPosts: [...state.savedPosts, action.payload],
      };
    default:
      return state;
  }
};

export default dataReducer;
export type { SetDataAction, AddPostAction, DataActionTypes };
