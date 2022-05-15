import { client } from "@tilework/opus";
import { selectedAttributes } from "../components/attributes/Atrributes.slice";
import {
  addProductDescription,
  addProducts,
} from "../components/categories.slice";
import { store } from "../store/store";
import { ProductType } from "../types/types";
import { PDP_DATA, PLP_PRODUCT_DATA, PRODUCT_DATA_All } from "./queries";

export function getAttributes(
  product: ProductType,
  attState: selectedAttributes[]
) {
  const { attributes, id } = product;
  if (attributes === undefined || attributes[0] === undefined) return;

  if (attState.every((item) => item.productId !== id)) {
    if (attributes === undefined) return;
    let defaultAtt: { id: string; itemId: string }[] = [];
    attributes.forEach((att) => {
      if (att !== undefined) {
        defaultAtt.push({ id: att.id, itemId: att.items[0].id });
      }
    });
    return defaultAtt;
  }

  let stateAttribs = attState.filter((item) => item.productId === id)[0]
    .attribs;

  if (stateAttribs.length < attributes.length) {
    let missingAttribs: { id: string; itemId: string }[] = [];

    attributes.forEach((productAtt) => {
      if (stateAttribs.every((stateAtt) => stateAtt.id !== productAtt?.id)) {
        if (!productAtt) return;
        missingAttribs = [
          ...missingAttribs,
          {
            id: productAtt.id,
            itemId: productAtt.items[0].id,
          },
        ];
      }
    });
    return [...missingAttribs, ...stateAttribs];
  }
  return stateAttribs;
}
export async function getPLPData(category: string) {
  const { Categories } = store.getState();
  const Cat = Categories.find((cat) => cat.name === category);
  if (Cat?.fetched && Cat?.fetched !== undefined) return;
  const DATA = await client.post(PLP_PRODUCT_DATA(category));
  store.dispatch(
    addProducts({
      productData: DATA.category?.products,
      category: category,
    })
  );
}

export async function getPDPData(productId: string) {
  const { Categories } = store.getState();
  const product = Categories.map((cat) => {
    if (cat.products)
      return cat.products.find(
        (product) => product.id === productId ?? product
      );
    return null;
  }).find(Boolean);
  if (!product) {
    const PRODUCT = await client.post(PRODUCT_DATA_All(productId));
    store.dispatch(
      addProductDescription({
        catName: PRODUCT.product.category,
        productData: PRODUCT.product,
      })
    );
    return;
  }
  if (product.attributes && product.description) return;
  const PRODUCT = await client.post(PDP_DATA(productId));
  store.dispatch(
    addProductDescription({
      catName: PRODUCT.product.category,
      productData: PRODUCT.product,
    })
  );
  return PRODUCT;
}
