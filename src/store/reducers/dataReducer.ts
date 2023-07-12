import { Action } from "redux";

export interface RootState {
  data: any[];
  savedPosts: any[];
  editedPost: any | null; // New state for editedPost
}

const initialState: RootState = {
  data: [],
  savedPosts: [],
  editedPost: null, // Initialize editedPost as null
};

export interface SetDataAction extends Action<"SET_DATA"> {
  payload: any[];
}

export interface AddPostAction extends Action<"ADD_POST"> {
  payload: any;
}

export interface EditPostAction extends Action<"EDIT_POST"> {
  payload: any;
}

export type DataActionTypes = SetDataAction | AddPostAction | EditPostAction; // Include EditPostAction in union type

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
    case "EDIT_POST": // Handle EditPostAction
      return {
        ...state,
        editedPost: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
