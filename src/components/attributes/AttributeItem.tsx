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
              width: this.props.size === "s" ? "24px" : "63px",
              height: this.props.size === "s" ? "24px" : "45px",
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
            {item.displayValue.toLocaleUpperCase()}
          </TextBox>
        );
      }
      if (this.props.attributes.type === "swatch") {
        return (
          <SwatchContainer
            key={item.id}
            style={{
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
      let item = this.props.attributeStateCart.filter(
        (item) => item.id === this.props.cartId
      )[0];
      return item.attribs.some(
        (att) => att.id === attId && att.itemId === itemId
      );
    }
  }
  handleClick(AttribId: string, itemId: string) {
    if (this.props.cartId !== undefined) {
      this.props.dispatch(
        setAttribute({
          cartItemId: this.props.cartId,
          attrib: { id: AttribId, itemId: itemId },
        })
      );
    }
  }
  render() {
    return (
      <AttributeWrapper>
        <Title>{this.props.attributes.name.toLocaleUpperCase() + ":"}</Title>
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
`;
const Title = styled.div`
  font-family: Roboto Condensed;
  font-size: 18px;
  font-weight: 700;
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
  cursor: pointer;
  font-family: Source Sans Pro;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.05em;
  text-align: center;
`;
const SwatchContainer = styled.div`
  border: none;
  padding: 2px;
`;
const SwatchBox = styled.button`
  border: none;
  cursor: pointer;
  margin: 0;
`;
