import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { AttributeSet } from "../../types/types";
import { cartItemType, setAttribute } from "../cart/cart.slice";
import { selectAttribute, selectedAttributes } from "./Atrributes.slice";

interface AttributeItemProps {
  attributes: AttributeSet;
  size: "s" | "lg";
  productID: string;
  cartId?: number;
  //state props
  attributeStateCart: cartItemType[];
  attributeSelected: selectedAttributes[];
  dispatch: Dispatch;
  //stateprops
}

class AttributeItem extends React.Component<AttributeItemProps> {
  renderItems() {
    // return attributes or swatches
    return this.props.attributes.items.map((item) => {
      if (this.props.attributes.type === "text") {
        return (
          <TextBox
            onClick={() => {
              this.handleClick(this.props.attributes.id, item.id);
            }}
            key={item.id}
            style={{
              cursor: this.props.cartId ? "" : "pointer",
              minWidth: this.props.size === "s" ? "24px" : "63px",
              height: this.props.size === "s" ? "24px" : "45px",
              fontSize: this.props.size === "s" ? "14px" : "16px",
              backgroundColor: this.isSelected(
                this.props.attributes.id,
                item.id
              )
                ? "#1D1F22"
                : "#ffffff",
              color: this.isSelected(this.props.attributes.id, item.id)
                ? "#ffffff"
                : "#1D1F22",
            }}
          >
            {this.props.size === "s"
              ? /\d/.test(item.displayValue)
                ? item.displayValue.toLocaleUpperCase() // if its a number display it all
                : item.displayValue.length < 4 // if not then check length
                ? item.displayValue.toLocaleUpperCase() // if its small then display
                : item.displayValue.toLocaleUpperCase().charAt(0) // if not display only first letter
              : item.displayValue.toLocaleUpperCase()}
          </TextBox>
        );
      }
      if (this.props.attributes.type === "swatch") {
        return (
          <SwatchContainer
            key={item.id}
            style={{
              cursor: this.props.cartId ? "" : "pointer",
              border: this.isSelected(this.props.attributes.id, item.id)
                ? "2px solid #5ECE7B"
                : "2px solid transparent",
              width: this.props.size === "s" ? "16px" : "32px",
              height: this.props.size === "s" ? "16px" : "32px",
            }}
          >
            <SwatchBox
              onClick={() =>
                this.handleClick(this.props.attributes.id, item.id)
              }
              key={item.id}
              style={{
                width: this.props.size === "s" ? "16px" : "32px",
                height: this.props.size === "s" ? "16px" : "32px",
                backgroundColor: item.value,
              }}
            ></SwatchBox>
          </SwatchContainer>
        );
      }
      return <p>No Type sepcified</p>;
    });
  }
  isSelected(attId: string, itemId: string) {
    if (this.props.cartId !== undefined) {
      // this functino checks cart state and looks for item and its attributes
      let item = this.props.attributeStateCart.filter(
        (item) => item.id === this.props.cartId
      )[0];
      if (item.attribs === undefined) return;
      return item.attribs.some(
        (att) => att.id === attId && att.itemId === itemId
      );
    }
    // if this component is not inside a cart component this is called to check for its attributes in attributes global state
    let item = this.props.attributeSelected.filter(
      (item) => item.productId === this.props.productID
    )[0];
    return item
      ? item.attribs.some((att) => att.id === attId && att.itemId === itemId)
      : false;
  }
  handleClick(AttribId: string, itemId: string) {
    if (this.props.cartId !== undefined) {
      // this functino checks cart state and sets its attributes
      return;
      /*this.props.dispatch(
        setAttribute({
          cartItemId: this.props.cartId,
          attrib: { id: AttribId, itemId: itemId },
        })
      );*/
    }
    // if its not from a cart it sets it in attributes global state
    this.props.dispatch(
      selectAttribute({
        productId: this.props.productID,
        attribute: { id: AttribId, itemId: itemId },
      })
    );
  }
  render() {
    return (
      <AttributeWrapper>
        <Title
          style={{
            marginTop: this.props.size === "s" ? "0" : "20px",
            fontSize: this.props.size === "s" ? "14px" : "18px",
            fontWeight: this.props.size === "s" ? "400" : "700",
          }}
        >
          {this.props.attributes.name.toLocaleUpperCase() + ":"}
        </Title>
        <AttributeContainer>{this.renderItems()}</AttributeContainer>
      </AttributeWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  attributeStateCart: state.Cart,
  attributeSelected: state.Attributes,
});

export default connect(mapStateToProps)(AttributeItem);

const AttributeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100px;
`;
const Title = styled.div`
  font-family: Roboto Condensed;
  line-height: 18px;
  letter-spacing: 0em;
`;
const AttributeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const TextBox = styled.button`
  border: 1px solid #1d1f22;
  box-sizing: border-box;
  font-family: Source Sans Pro;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: center;
`;
const SwatchContainer = styled.div`
  border: none;
  padding: 1px;
`;
const SwatchBox = styled.button`
  border: none;
  margin: 0;
  padding: 0;
`;
