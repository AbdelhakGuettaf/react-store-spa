import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { ProductType } from "../../../types/types";
import { selectedAttributes } from "../../attributes/Atrributes.slice";
import Attributes from "../../attributes/Attributes";
import Price from "../../Price";
import DOMPurify from "dompurify";
import { addToCart } from "../../cart/cart.slice";
import { getAttributes } from "../../../utils/functions";
import * as Styled from "./PDP.styling";
interface Props {
  attributeState: selectedAttributes[];
  dispatch: Dispatch;
  product: ProductType;
}

class ProductDetails extends React.Component<Props> {
  addToCart() {
    const { dispatch, product, attributeState } = this.props;
    dispatch(
      addToCart({
        attribs: getAttributes(product, attributeState),
        id: Date.now(),
        product: product,
        quantity: 1,
      })
    );
  }
  render() {
    const {
      product: { brand, name, attributes, id, prices, inStock, description },
    } = this.props;
    return (
      <Styled.DetailsWrap>
        <Styled.Brand>{brand}</Styled.Brand>
        <Styled.Name> {name} </Styled.Name>
        <Attributes size="lg" attributes={attributes} productID={id} />
        <Styled.Span>PRICE:</Styled.Span>
        <Price price={prices} size={24} wieght={"700"} />
        <Styled.CartButton
          style={{
            backgroundColor: inStock ? "#5ece7b" : "#eeeeee",
          }}
          onClick={() => {
            if (!inStock) return;
            this.addToCart();
          }}
        >
          ADD TO CART
        </Styled.CartButton>
        <Styled.Description
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        ></Styled.Description>
      </Styled.DetailsWrap>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  attributeState: state.Attributes,
});

export default connect(mapStateToProps)(ProductDetails);
