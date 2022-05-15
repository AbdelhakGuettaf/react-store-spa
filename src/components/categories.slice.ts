import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "../types/types";

const initialState: CategoryType[] = [];

export const CategorySlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      if (!state.every((category) => category.name === action.payload.name)) {
        return;
      }
      return [...state, action.payload];
    },
    addCategories: (state, action) => {
      return (state = action.payload);
    },
    addProducts: (
      state,
      {
        payload: { productData, category },
      }: PayloadAction<{ productData: any; category: string }>
    ) => {
      return state.map((cat) => {
        if (cat.name === category) {
          return { ...cat, products: productData, fetched: true };
        }
        return cat;
      });
    },
    addProductDescription: (
      state,
      {
        payload: { productData, catName },
      }: PayloadAction<{ productData: any; catName: string }>
    ) => {
      return state.map((cat) => {
        if (cat.name === catName || cat.name === "all") {
          if (cat.products === undefined) {
            return { ...cat, products: [productData] };
          }
          let newProduct = {
            ...cat.products.find((pro) => pro.id === productData.id),
            ...productData,
          };
          let newArray = cat.products.map((pro) => {
            if (pro.id === productData.id) {
              return newProduct;
            }
            return pro;
          });
          return { ...cat, products: [...newArray] };
        }
        return cat;
      });
    },
  },
});
export const {
  addCategory,
  addCategories,
  addProducts,
  addProductDescription,
} = CategorySlice.actions;

export default CategorySlice.reducer;
