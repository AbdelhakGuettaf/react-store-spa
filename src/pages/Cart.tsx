import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { cartItemType, clearCart } from "../components/cart/cart.slice";
import CartItems from "../components/cart/cartItems";
import { RootState } from "../store/store";

interface CartProps {
  items: cartItemType[];
  currency: string;
  symbol: string;
  dispatch: Dispatch;
}

class Cart extends React.Component<CartProps> {
  getQuantity() {
    return this.props.items.reduce(
      (preVal, curItem) => (preVal = preVal + curItem.quantity),
      0
    );
  }
  getTotalPrice() {
    return this.props.items
      .map((item) => {
        return item.product.prices
          .filter((price) => price.currency.label === this.props.currency)
          .map((price) => price.amount * item.quantity);
      })
      .reduce((preVal, curVal) => {
        return (preVal = preVal + curVal[0]);
      }, 0);
  }
  render() {
    if (!this.props.items[0]) {
      return (
        <CartWrapper>
          <Title>CART</Title>
          <p>No products in cart.</p>
        </CartWrapper>
      );
    }
    return (
      <CartWrapper>
        <Title>CART</Title>
        <CartItems />
        <div>
          <Table>
            <tbody>
              <tr>
                <TDProperty>Tax 21%:</TDProperty>
                <TDValue>
                  {this.props.symbol + (this.getTotalPrice() * 0.21).toFixed(2)}
                </TDValue>
              </tr>
              <tr>
                <TDProperty>Quantity:</TDProperty>
                <TDValue>{this.getQuantity()}</TDValue>
              </tr>
              <tr>
                <TDTotal>Total:</TDTotal>
                <TDValue>
                  {this.props.symbol +
                    (
                      this.getTotalPrice() +
                      this.getTotalPrice() * 0.21
                    ).toFixed(2)}
                </TDValue>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Order onClick={() => this.props.dispatch(clearCart())}>
                    ORDER
                  </Order>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </CartWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: state.Cart,
  currency: state.App.currency,
  symbol: state.App.symbol,
});

export default connect(mapStateToProps)(Cart);

const Title = styled.h1`
  //styleName: Heading / Desktop / H2;
  font-family: Raleway;
  font-size: 42px;
  font-weight: 700;
  line-height: 67px;
  letter-spacing: 0px;
  text-align: left;
  margin: 50px 0;
`;
const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 7%;
`;
const Table = styled.table`
  min-width: 280px;
`;
const TDProperty = styled.td`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
`;
const TDValue = styled.td`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;
const TDTotal = styled.td`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0em;
`;
const Order = styled.button`
  margin-top: 20px;
  margin-bottom: 200px;
  background: #5ece7b;
  width: 100%;
  padding: 13px 0;
  border: none;
  font-family: Raleway;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;
