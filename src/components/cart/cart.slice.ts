import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../types/types";

export type cartItemType = {
  id: number;
  product: ProductType;
  attribs: { id: string; itemId: string }[];
  quantity: number;
};

const initialState: cartItemType[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItemType>) => {
      return [...state, action.payload];
    },
    incrementCount: (state, action: PayloadAction<{ itemId: number }>) => {
      state.map((item) => {
        if (item.id !== action.payload.itemId) return null;
        return { ...item, quantity: item.quantity++ };
      });
    },
    decrementCount: (state, action: PayloadAction<{ itemId: number }>) => {
      state.map((item) => {
        if (item.id !== action.payload.itemId) return null;
        return { ...item, quantity: item.quantity-- };
      });
    },
    setAttribute: (
      state,
      action: PayloadAction<{
        cartItemId: number;
        attrib: { id: string; itemId: string };
      }>
    ) => {
      console.log("here");
      state.map((item) => {
        if (item.id === action.payload.cartItemId) {
          item.attribs.map((attrib) => {
            if (attrib.id === action.payload.attrib.id) {
              return (attrib.itemId = action.payload.attrib.itemId);
            }
            return attrib;
          });
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, incrementCount, decrementCount, setAttribute } =
  cartSlice.actions;

export default cartSlice.reducer;
