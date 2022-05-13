import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
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
      if (!action.payload.product.inStock) return;
      if (
        !state.every((item) => item.product.id !== action.payload.product.id)
      ) {
        // product already in cart so we'll check if user changed attributes here
        if (action.payload.attribs === undefined) return; // if item has no attributes then don't add to cart if exists

        const checkObjects = (
          o1: { [x: string]: any },
          o2: { [x: string]: any }
        ) => {
          console.log(o1, current(o2));
          return (
            Object.keys(o1).length === Object.keys(o2).length &&
            Object.keys(o1).every((p) => o1[p] === o2[p])
          );
        };

        const cartItem = state.filter(
          (i) => i.product.id === action.payload.product.id
        ); // this could be an array as user may have added multiple products with different attributes

        //let checker: boolean = false; // this is a halfassed way to go about it, this var get mutated to true proudct attribs haven't changed

        const arrayCheck = (arr: any) => {
          //this function recieves all attribute arrays of the same product
          // and checks them again the payload attributes
          // if
          console.log("******");
          console.log(action.payload.attribs);
          if (arr === undefined) return false;
          let checker = false;
          arr.forEach((cartArr: any) => {
            action.payload.attribs?.forEach((actionAtt) => {
              if (actionAtt.id !== cartArr.id) return;
              if (!checkObjects(actionAtt, cartArr)) checker = true;
            });
          });
          console.log(checker);
          console.log("******");
          return checker;
          /*return arr.every(
            (cartAtt: any) =>
              action.payload.attribs &&
              action.payload.attribs.every((att) => checkObjects(att, cartAtt))
          );*/
        };
        const booleans: boolean[] = [];
        cartItem.forEach((cart) => {
          booleans.push(arrayCheck(cart.attribs));
        });
        if (booleans.every((val) => val === true))
          return [...state, action.payload];
        return;
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
      state.map((item) => {
        if (item.id === action.payload.cartItemId) {
          if (item.attribs === undefined) return action.payload;
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
    removeFromCart: (state, action: PayloadAction<{ itemId: number }>) => {
      return [...state.filter((item) => item.id !== action.payload.itemId)];
    },
    clearCart: (state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  incrementCount,
  decrementCount,
  setAttribute,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
