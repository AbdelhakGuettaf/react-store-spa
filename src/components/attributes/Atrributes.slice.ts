import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type selectedAttributes = {
  id: string;
  productId: string;
  attId: string;
  itemId: string;
};

const initialState: selectedAttributes[] = [];

export const AttributeState = createSlice({
  name: "Attributes",
  initialState,
  reducers: {
    selectAttribute: (state, action: PayloadAction<selectedAttributes>) => {
      if (state.includes(action.payload)) {
        return state.map((state) => {
          if (state.productId === action.payload.productId) {
            return { ...action.payload };
          }
          return state;
        });
      }
      return [...state, action.payload];
    },
  },
});

export const { selectAttribute } = AttributeState.actions;

export default AttributeState.reducer;
