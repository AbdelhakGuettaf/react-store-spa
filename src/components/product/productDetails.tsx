import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { currency } from "../../app/app.slice";
import { RootState } from "../../store/store";
import { ProductType } from "../../types/types";
import { selectedAttributes } from "../attributes/Atrributes.slice";
import Attributes from "../attributes/Attributes";
import Price from "../Price";
import DOMPurify from "dompurify";
import { addToCart } from "../cart/cart.slice";
import { getAttributes } from "../../utils/functions";

interface Props {
  attributeState: selectedAttributes[];
  currency: currency;
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
      <DetailsWrap>
        <Brand>{this.props.product.brand}</Brand>
        <Name> {this.props.product.name} </Name>
        <Attributes
          size="lg"
          attributes={this.props.product.attributes}
          productID={this.props.product.id}
        />
        <Span>PRICE:</Span>
        <Price price={this.props.product.prices} size={24} wieght={"700"} />
        <CartButton
          style={{
            backgroundColor: this.props.product.inStock ? "#5ece7b" : "#eeeeee",
          }}
          onClick={() => {
            if (!this.props.product.inStock) return;
            this.addToCart();
          }}
        >
          ADD TO CART
        </CartButton>
        <Description
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(this.props.product.description), //sanitized HTML
          }}
        ></Description>
      </DetailsWrap>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  attributeState: state.Attributes,
  currency: state.App,
});

export default connect(mapStateToProps)(ProductDetails);

const DetailsWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Brand = styled.div`
  font-family: Raleway;
  font-size: 2em;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
`;
const Name = styled.div`
  margin-top: 16px;
  margin-bottom: 43px;
  font-family: Raleway;
  font-size: 30px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
`;
const Span = styled.h1`
  margin-top: 12px;
  font-family: Roboto Condensed;
  font-size: 18px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
`;
const CartButton = styled.button`
  border: none;
  color: #fff;
  padding: 16px 0;
  //styleName: --button-font;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
`;
const Description = styled.div`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
`;
