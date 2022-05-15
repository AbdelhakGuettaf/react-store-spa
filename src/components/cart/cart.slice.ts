import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../types/types";

export type cartItemType = {
  id: number;
  product: ProductType;
  attribs?: { id: string; itemId: string }[];
  quantity: number;
};

const initialState: cartItemType[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItemType>) => {
      const { product, attribs } = action.payload;
      if (!product.inStock) return;
      if (!state.every(({ product: { id } }) => id !== product.id)) {
        if (attribs === undefined) return;

        const checkObjects = (
          o1: { [x: string]: any },
          o2: { [x: string]: any }
        ) => {
          return (
            Object.keys(o1).length === Object.keys(o2).length &&
            Object.keys(o1).every((p) => o1[p] === o2[p])
          );
        };

        const cartItem = state.filter(
          ({ product: { id } }) => id === product.id
        );

        let ItemId: number;

        const arrayCheck = (arr: any) => {
          if (arr === undefined) return false;
          let checker = false;
          arr.forEach((cartArr: any) => {
            attribs?.forEach((actionAtt) => {
              if (actionAtt.id !== cartArr.id) return;
              if (!checkObjects(actionAtt, cartArr)) return (checker = true);
            });
          });
          return checker;
        };
        const booleans: boolean[] = [];
        cartItem.forEach(({ attribs, id }) => {
          booleans.push(arrayCheck(attribs));
          if (!arrayCheck(attribs)) ItemId = id;
        });
        if (booleans.every((val) => val === true))
          return [...state, action.payload];
        return state.map((item) => {
          if (item.id === ItemId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
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
      const { attrib, cartItemId } = action.payload;
      state.map((item) => {
        const { id, attribs } = item;
        if (id === cartItemId) {
          if (attribs === undefined) return action.payload;
          attribs.map(({ id, itemId }) => {
            if (id === attrib.id) {
              return (itemId = attrib.itemId);
            }
            return attrib;
          });
        }
        return item;
      });
    },
    removeFromCart: (state, action: PayloadAction<{ itemId: number }>) => {
      return [...state.filter((item) => item.id !== action.payload.itemId)];
    },
    clearCart: () => {
      return initialState;
    },
  },
});

export const {
  addToCart,
  incrementCount,
  decrementCount,
  setAttribute,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
