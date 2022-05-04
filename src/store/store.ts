import { configureStore } from "@reduxjs/toolkit";
import { AppSlice } from "../app/app.slice";
import { AttributeState } from "../components/attributes/Atrributes.slice";
import { cartSlice } from "../components/cart/cart.slice";
import { CategorySlice } from "../components/categories.slice";

export const store = configureStore({
  reducer: {
    Categories: CategorySlice.reducer,
    App: AppSlice.reducer,
    Cart: cartSlice.reducer,
    Attributes: AttributeState.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
