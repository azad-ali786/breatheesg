import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  // Define the initial state for your data
  filledData: any[]; // Array to store filled data
}

const initialState: DataState = {
  filledData: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addFilledData: (state, action: PayloadAction<any>) => {
      state.filledData.push(action.payload);
    },
  },
});

export const { addFilledData } = dataSlice.actions;

export default dataSlice.reducer;
