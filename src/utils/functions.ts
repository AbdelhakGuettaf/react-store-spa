import { selectedAttributes } from "../components/attributes/Atrributes.slice";
import { ProductType } from "../types/types";

export function getAttributes(
  product: ProductType,
  attState: selectedAttributes[]
) {
  //**********************************************************************************************************
  //* This function checks what user has selected and fills the missing attributes with first item as default*
  //**********************************************************************************************************

  if (product.attributes[0] === undefined) return; // No attributes in this product returns undef

  if (attState.every((item) => item.productId !== product.id)) {
    // no selected attributes in global state
    // this will send default attributes to cart state, first options will be selected
    if (product.attributes === undefined) return;
    let defaultAtt: { id: string; itemId: string }[] = [];
    product.attributes.forEach((att) => {
      if (att !== undefined) {
        defaultAtt.push({ id: att.id, itemId: att.items[0].id });
      }
    });
    return defaultAtt;
  }
  // if it has selected attribute we will check if all of them are selected and if not pass first items as default

  let stateAttribs = attState.filter((item) => item.productId === product.id)[0]
    .attribs;

  if (stateAttribs.length < product.attributes.length) {
    //***********************************************************************************************************
    //*if user didn't specify all attributes this code will run and find missing attribute and set it to default*
    //***********************************************************************************************************
    let missingAttribs: { id: string; itemId: string }[] = []; // terrible but easy approach by mutating this array

    product.attributes.forEach((productAtt) => {
      if (stateAttribs.every((stateAtt) => stateAtt.id !== productAtt?.id)) {
        // this Attribute is not in selected Attributes state so return the first item as default
        // eslint-disable-next-line array-callback-return
        console.log(productAtt);
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
    return [...missingAttribs, ...stateAttribs]; // returns attributes in state and missing defaults
  }
  // if user selected all attributes return the state attributes
  return stateAttribs;
}
