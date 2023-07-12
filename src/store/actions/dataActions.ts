import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers/dataReducer";
import { fetchData } from "../../utils/apiUtils";

interface SetDataAction extends Action<"SET_DATA"> {
  payload: any[];
}

type DataActionTypes = SetDataAction;

export const setData = (data: any[]): SetDataAction => {
  return {
    type: "SET_DATA",
    payload: data,
  };
};

export const fetchDataAction = (): ThunkAction<
  void,
  RootState,
  unknown,
  DataActionTypes
> => {
  return (dispatch) => {
    fetchData()
      .then((response) => {
        dispatch(setData(response.data));
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };
};
