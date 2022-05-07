import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type selectedAttributes = {
  productId: string;
  attribs: { id: string; itemId: string }[];
};

const initialState: selectedAttributes[] = [
  {
    productId: "huarache-x-stussy-le",
    attribs: [{ id: "Size", itemId: "42" }],
  },
];

export const AttributeState = createSlice({
  name: "Attributes",
  initialState,
  reducers: {
    selectAttribute: (
      state,
      action: PayloadAction<{
        productId: string;
        attribute: { id: string; itemId: string };
      }>
    ) => {
      if (state.every((item) => item.productId !== action.payload.productId)) {
        return [
          ...state,
          {
            productId: action.payload.productId,
            attribs: [
              {
                id: action.payload.attribute.id,
                itemId: action.payload.attribute.itemId,
              },
            ],
          },
        ];
      }
      state.map((item) => {
        if (item.productId === action.payload.productId) {
          if (
            item.attribs.every((att) => att.id !== action.payload.attribute.id)
          ) {
            let attribs = item.attribs;
            attribs.push(action.payload.attribute);
            let newItem = { productId: item.productId, attribs: attribs };
            return newItem;
          }
          item.attribs.map((attrib) => {
            if (attrib.id === action.payload.attribute.id) {
              return (attrib.itemId = action.payload.attribute.itemId);
            }
            return attrib;
          });
        }
        return item;
      });
    },
  },
});

export const { selectAttribute } = AttributeState.actions;

export default AttributeState.reducer;
