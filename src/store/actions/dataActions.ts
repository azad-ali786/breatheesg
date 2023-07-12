import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers/dataReducer";
import { fetchData, postData } from "../../utils/apiUtils";

interface SetDataAction extends Action<"SET_DATA"> {
  payload: any[];
}

interface AddPostAction extends Action<"ADD_POST"> {
  payload: any;
}

interface EditPostAction extends Action<"EDIT_POST"> {
  payload: any;
}

type DataActionTypes = SetDataAction | AddPostAction | EditPostAction;

export const setData = (data: any[]): SetDataAction => {
  return {
    type: "SET_DATA",
    payload: data,
  };
};

export const addPost = (post: any): AddPostAction => {
  return {
    type: "ADD_POST",
    payload: post,
  };
};

export const editPost = (post: any): EditPostAction => {
  return {
    type: "EDIT_POST",
    payload: post,
  };
};

export const fetchDataAction = (): ThunkAction<
  void,
  RootState,
  unknown,
  DataActionTypes
> => {
  return async (dispatch) => {
    try {
      const response = await fetchData();
      dispatch(setData(response.data));
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
};

export const savePostAction = (
  post: any
): ThunkAction<void, RootState, unknown, DataActionTypes> => {
  return async (dispatch) => {
    try {
      const response = await postData(post);
      dispatch(addPost(post));
      alert(response);
    } catch (error) {
      console.log("Error saving post:", error);
    }
  };
};

export const saveEditAction = (
  post: any
): ThunkAction<void, RootState, unknown, DataActionTypes> => {
  return async (dispatch) => {
    try {
      const response = await postData(post);
      dispatch(editPost(post));
    } catch (error) {
      console.log("Error saving edited post:", error);
    }
  };
};
