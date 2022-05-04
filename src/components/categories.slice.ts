import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "../types/types";

const initialState: CategoryType[] = [];

export const CategorySlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<CategoryType>) => {
      if (!state.every((category) => category.name === action.payload.name)) {
        return;
      }
      return [...state, action.payload];
    },
    addCategories: (state, action: PayloadAction<CategoryType[]>) => {
      return (state = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCategory, addCategories } = CategorySlice.actions;

export default CategorySlice.reducer;
