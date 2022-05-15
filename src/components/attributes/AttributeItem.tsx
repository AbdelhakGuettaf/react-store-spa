import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { AttributeSet } from "../../types/types";
import { cartItemType } from "../cart/cart.slice";
import { selectAttribute, selectedAttributes } from "./Atrributes.slice";
import * as Styled from "./Attributes.styling";

interface AttributeItemProps {
  attributes: AttributeSet;
  size: "s" | "lg";
  productID: string;
  cartId?: number;
  attributeStateCart: cartItemType[];
  attributeSelected: selectedAttributes[];
  dispatch: Dispatch;
}

class AttributeItem extends React.Component<AttributeItemProps> {
  renderItems() {
    const { attributes, cartId, size } = this.props;
    return attributes.items.map((item) => {
      if (attributes.type === "text") {
        return (
          <Styled.TextBox
            onClick={() => {
              this.handleClick(attributes.id, item.id);
            }}
            key={item.id}
            style={{
              cursor: cartId ? "" : "pointer",
              minWidth: size === "s" ? "24px" : "63px",
              height: size === "s" ? "24px" : "45px",
              fontSize: size === "s" ? "14px" : "16px",
              backgroundColor: this.isSelected(attributes.id, item.id)
                ? "#1D1F22"
                : "#ffffff",
              color: this.isSelected(attributes.id, item.id)
                ? "#ffffff"
                : "#1D1F22",
            }}
          >
            {size === "s" //
              ? /\d/.test(item.value)
                ? item.value.toLocaleUpperCase()
                : item.value.length < 4
                ? item.value.toLocaleUpperCase()
                : item.value.toLocaleUpperCase().charAt(0)
              : item.value.toLocaleUpperCase()}
          </Styled.TextBox>
        );
      }
      if (attributes.type === "swatch") {
        return (
          <Styled.SwatchContainer
            key={item.id}
            style={{
              cursor: cartId ? "" : "pointer",
              border: this.isSelected(attributes.id, item.id)
                ? "2px solid #5ECE7B"
                : "2px solid transparent",
              width: size === "s" ? "16px" : "32px",
              height: size === "s" ? "16px" : "32px",
            }}
          >
            <Styled.SwatchBox
              onClick={() => this.handleClick(attributes.id, item.id)}
              key={item.id}
              style={{
                width: size === "s" ? "16px" : "32px",
                height: size === "s" ? "16px" : "32px",
                backgroundColor: item.value,
              }}
            ></Styled.SwatchBox>
          </Styled.SwatchContainer>
        );
      }
      return <></>;
    });
  }
  isSelected(attId: string, itemId: string) {
    const { cartId, attributeStateCart, attributeSelected, productID } =
      this.props;
    if (cartId !== undefined) {
      let item = attributeStateCart.filter((item) => item.id === cartId)[0];
      if (item.attribs === undefined) return;
      return item.attribs.some(
        (att) => att.id === attId && att.itemId === itemId
      );
    }
    let item = attributeSelected.filter(
      (item) => item.productId === productID
    )[0];
    return item
      ? item.attribs.some((att) => att.id === attId && att.itemId === itemId)
      : false;
  }
  handleClick(AttribId: string, itemId: string) {
    const { cartId, dispatch, productID } = this.props;
    if (cartId !== undefined) {
      return;
    }
    dispatch(
      selectAttribute({
        productId: productID,
        attribute: { id: AttribId, itemId: itemId },
      })
    );
  }
  render() {
    const { size, attributes } = this.props;
    return (
      <Styled.AttributeWrapper>
        <Styled.Title
          style={{
            marginTop: size === "s" ? "0" : "20px",
            fontSize: size === "s" ? "14px" : "18px",
            fontWeight: size === "s" ? "400" : "700",
          }}
        >
          {attributes.name.toLocaleUpperCase() + ":"}
        </Styled.Title>
        <Styled.AttributeContainer>
          {this.renderItems()}
        </Styled.AttributeContainer>
      </Styled.AttributeWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  attributeStateCart: state.Cart,
  attributeSelected: state.Attributes,
});

export default connect(mapStateToProps)(AttributeItem);
