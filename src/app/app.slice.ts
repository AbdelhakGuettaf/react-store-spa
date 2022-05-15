import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type currency = { currency: string; symbol: string };

interface Currency {
  currentCurrency: currency;
  currencies: { label: string; symbol: string }[];
}

const initialState: Currency = {
  currentCurrency: { currency: "USD", symbol: "$" },
  currencies: [],
};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    changeCurrency: (state, action: PayloadAction<currency>) => {
      return { ...state, currentCurrency: action.payload };
    },
    addCurrencies: (
      state,
      action: PayloadAction<{ label: any; symbol: any }[]>
    ) => {
      return { ...state, currencies: action.payload };
    },
  },
});

export const { changeCurrency, addCurrencies } = AppSlice.actions;

export default AppSlice.reducer;
