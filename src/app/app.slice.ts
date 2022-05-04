import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type currency = {
  currency: string;
  symbol: string;
};

const initialState: currency = {
  currency: "USD",
  symbol: "$",
};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<currency>) => {
      return { ...action.payload };
    },
  },
});

export const { changeCurrency } = AppSlice.actions;

export default AppSlice.reducer;
