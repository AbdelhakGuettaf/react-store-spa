import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { cartItemType, clearCart } from "../components/cart/cart.slice";
import CartItems from "../components/cart/cartItems";
import { RootState } from "../store/store";
import * as Styled from "./Carte.styling";

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
          .filter(({ currency: { label } }) => label === this.props.currency)
          .map(({ amount }) => amount * item.quantity);
      })
      .reduce((preVal, curVal) => {
        return (preVal = preVal + curVal[0]);
      }, 0);
  }
  render() {
    if (!this.props.items[0]) {
      return (
        <Styled.CartWrapper>
          <Styled.Title>CART</Styled.Title>
          <p>No products in cart.</p>
        </Styled.CartWrapper>
      );
    }
    return (
      <Styled.CartWrapper>
        <Styled.Title>CART</Styled.Title>
        <CartItems />
        <div>
          <Styled.Table>
            <tbody>
              <tr>
                <Styled.TDProperty>Tax 21%:</Styled.TDProperty>
                <Styled.TDValue>
                  {this.props.symbol + (this.getTotalPrice() * 0.21).toFixed(2)}
                </Styled.TDValue>
              </tr>
              <tr>
                <Styled.TDProperty>Quantity:</Styled.TDProperty>
                <Styled.TDValue>{this.getQuantity()}</Styled.TDValue>
              </tr>
              <tr>
                <Styled.TDTotal>Total:</Styled.TDTotal>
                <Styled.TDValue>
                  {this.props.symbol +
                    (
                      this.getTotalPrice() +
                      this.getTotalPrice() * 0.21
                    ).toFixed(2)}
                </Styled.TDValue>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Styled.Order
                    onClick={() => this.props.dispatch(clearCart())}
                  >
                    ORDER
                  </Styled.Order>
                </td>
              </tr>
            </tbody>
          </Styled.Table>
        </div>
      </Styled.CartWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: state.Cart,
  currency: state.App.currentCurrency.currency,
  symbol: state.App.currentCurrency.symbol,
});

export default connect(mapStateToProps)(Cart);
