import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { currency } from "../../../app/app.slice";
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
    this.props.dispatch(
      addToCart({
        attribs: getAttributes(this.props.product, this.props.attributeState),
        id: Date.now(),
        product: this.props.product,
        quantity: 1,
      })
    );
  }
  render() {
    return (
      <Styled.DetailsWrap>
        <Styled.Brand>{this.props.product.brand}</Styled.Brand>
        <Styled.Name> {this.props.product.name} </Styled.Name>
        <Attributes
          size="lg"
          attributes={this.props.product.attributes}
          productID={this.props.product.id}
        />
        <Styled.Span>PRICE:</Styled.Span>
        <Price price={this.props.product.prices} size={24} wieght={"700"} />
        <Styled.CartButton
          style={{
            backgroundColor: this.props.product.inStock ? "#5ece7b" : "#eeeeee",
          }}
          onClick={() => {
            if (!this.props.product.inStock) return;
            this.addToCart();
          }}
        >
          ADD TO CART
        </Styled.CartButton>
        <Styled.Description
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.props.product.description),
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
