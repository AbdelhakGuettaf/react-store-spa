import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Attributes from "../attributes/Attributes";
import Carousel from "../Carousel/Carousel";
import Price from "../Price";
import {
  cartItemType,
  decrementCount,
  incrementCount,
  removeFromCart,
} from "./cart.slice";

interface CartItemProps {
  item: cartItemType;
  mini?: boolean;
  dispatch: Dispatch;
}

class CartItem extends React.Component<CartItemProps> {
  render() {
    return (
      <CartItemWrap style={{ maxHeight: this.props.mini ? "auto" : "auto" }}>
        <LeftVStack
          style={{
            gap: this.props.mini ? "4" : "15px",
          }}
        >
          <Brand
            style={{
              fontSize: this.props.mini ? "16px" : "",
              fontWeight: this.props.mini ? "300" : "",
            }}
          >
            {this.props.item.product.brand}
          </Brand>
          <Name
            style={{
              fontSize: this.props.mini ? "16px" : "",
              fontWeight: this.props.mini ? "300" : "",
            }}
          >
            {this.props.item.product.name}
          </Name>
          <div>
            <Price
              price={this.props.item.product.prices}
              size={this.props.mini ? 16 : 24}
              wieght={this.props.mini ? "500" : "700"}
            />
          </div>
          <Attributes
            size={this.props.mini ? "s" : "lg"}
            cart={this.props.item.id}
            productID={this.props.item.product.id}
            attributes={this.props.item.product.attributes}
          ></Attributes>
        </LeftVStack>
        <RightHStack>
          <Quantity
            style={{
              width: this.props.mini ? "24px" : "",
              marginRight: this.props.mini ? "" : "24px",
            }}
          >
            <TopButton
              style={{
                fontSize: this.props.mini ? "16px" : "",
                fontWeight: this.props.mini ? "300" : "",
                lineHeight: this.props.mini ? "1px" : "",
              }}
              onClick={() =>
                this.props.dispatch(
                  incrementCount({ itemId: this.props.item.id })
                )
              }
            >
              +
            </TopButton>
            <Count
              style={{
                fontSize: this.props.mini ? "16px" : "",
                fontWeight: this.props.mini ? "500" : "",
              }}
            >
              {this.props.item.quantity}
            </Count>
            <BotButton
              style={{
                fontSize: this.props.mini ? "16px" : "",
                fontWeight: this.props.mini ? "300" : "",
              }}
              onClick={() => {
                if (this.props.item.quantity === 1) {
                  this.props.dispatch(
                    removeFromCart({ itemId: this.props.item.id })
                  );
                  return;
                }
                this.props.dispatch(
                  decrementCount({ itemId: this.props.item.id })
                );
              }}
            >
              -
            </BotButton>
          </Quantity>
          {this.props.mini ? (
            <Img
              src={this.props.item.product.gallery[0]}
              alt="Product Gallery"
            />
          ) : (
            <Carousel imgs={this.props.item.product.gallery} />
          )}
        </RightHStack>
      </CartItemWrap>
    );
  }
}

export default connect()(CartItem);

const CartItemWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  border-top: #e5e5e5 1px solid;
  padding: 24px 0;
`;
const LeftVStack = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50%;
`;
const Brand = styled.div`
  font-family: Raleway;
  font-size: 30px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
`;
const Name = styled.div`
  font-family: Raleway;
  font-size: 30px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
`;
const RightHStack = styled.div`
  justify-self: flex-end;
  display: flex;
  flex-direction: row;
`;
const Quantity = styled.div`
  width: 45px;
  top: 0;
  bottom: 0;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TopButton = styled.button`
  cursor: pointer;
  aspect-ratio: 1;
  background-color: #fff;
  border: #1d1f22 1px solid;
  font-size: 30px;
  font-family: sand-serif;
  font-size: 30px;
  font-weight: 300;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: center;
  &:active {
    background-color: #1d1f22;
    color: #fff;
  }
`;
const Count = styled.div`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 500;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: center;
`;
const BotButton = styled.button`
  cursor: pointer;
  aspect-ratio: 1;
  background-color: #fff;
  border: #1d1f22 1px solid;
  font-size: 50px;
  font-family: sand-serif;
  font-size: 30px;
  font-weight: 300;
  &:active {
    background-color: #1d1f22;
    color: #fff;
  }
`;
const Img = styled.img`
  display: block;
  width: 80%;
  height: auto;
  max-width: 230px;
`;
