import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store/store";
import styled from "styled-components";
import logo from "../../assets/a-logo.svg";
import arrow from "../../assets/Vector.png";
import cartLogo from "../../assets/Empty-Cart.svg";
import "../../assets/css/global.css";
import { changeCurrency, currency } from "../../app/app.slice";
import { Dispatch } from "@reduxjs/toolkit";
import CartItems from "../cart/cartItems";
import { cartItemType, clearCart } from "../cart/cart.slice";
import * as Styled from "./Header.styling";
interface HeaderProps {
  data: String[];
  cartCount: number;
  currency: currency;
  currencyList: {
    label: string;
    symbol: string;
  }[];
  items: cartItemType[];
  dispatch: Dispatch;
}
type State = {
  toggleCurrency: boolean;
  toggleCart: boolean;
};

class MainHeader extends React.Component<HeaderProps, State> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = { toggleCurrency: false, toggleCart: false };
  }
  getCategoryNames() {
    return this.props.data.map((name, key) => (
      <SLink
        key={key}
        to={`${name}`}
        style={({ isActive }) =>
          isActive ? { fontWeight: "600" } : { fontWeight: "400" }
        }
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        {name.toLocaleUpperCase()}
      </SLink>
    ));
  }
  getItems() {
    const { currencyList, currency, dispatch } = this.props;
    if (!currencyList[0]) return;
    return (
      <Styled.CurrencyItem>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            {currencyList.map((item, key) => {
              return (
                <Styled.TR
                  style={{
                    backgroundColor:
                      item.label === currency.currency ? "#eeeeee" : "",
                  }}
                  key={key}
                  onClick={() => {
                    dispatch(
                      changeCurrency({
                        symbol: item.symbol,
                        currency: item.label,
                      })
                    );
                    this.setState(() => ({ toggleCurrency: false }));
                  }}
                >
                  <Styled.TD>{item.symbol}</Styled.TD>
                  <Styled.TD style={{ textAlign: "left" }}>
                    {item.label}
                  </Styled.TD>
                </Styled.TR>
              );
            })}
          </tbody>
        </table>
      </Styled.CurrencyItem>
    );
  }
  getTotalPrice() {
    return this.props.items
      .map((item) => {
        return item.product.prices
          .filter(
            (price) => price.currency.label === this.props.currency.currency
          )
          .map((price) => price.amount * item.quantity);
      })
      .reduce((preVal, curVal) => {
        return (preVal = preVal + curVal[0]);
      }, 0);
  }
  render() {
    const { toggleCart, toggleCurrency } = this.state;
    const { currency, cartCount, dispatch } = this.props;
    return (
      <Styled.Header>
        <Styled.Wrapper>
          <Styled.NavLinksWrap>
            <Styled.Nav style={{}}>{this.getCategoryNames()}</Styled.Nav>
          </Styled.NavLinksWrap>
          <Styled.Img src={logo} alt="Green Logo" />
          <Styled.Actions>
            <Styled.Currency
              onClick={() =>
                this.setState(() => ({
                  toggleCurrency: !toggleCurrency,
                }))
              }
            >
              <div>{currency.symbol}</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column-reverse",
                  paddingBottom: 10,
                }}
              >
                <img
                  src={arrow}
                  width={10}
                  height={5}
                  style={{
                    transform: toggleCurrency ? "rotate(180deg)" : "",
                    transition: "transform 150ms ease",
                  }}
                  alt="Toggle drop down currency"
                />
              </div>
            </Styled.Currency>
            <Styled.CurrencyList
              style={{
                top: toggleCurrency ? "0px" : "-100vh",
                opacity: toggleCurrency ? "1" : "0",
                transition:
                  "top 150ms ease-in-out,opacity 100ms 150ms ease-in-out",
              }}
              onClick={() =>
                this.setState(() => ({
                  toggleCurrency: false,
                }))
              }
            >
              {this.getItems()}
            </Styled.CurrencyList>
            <Styled.Overlay
              onClick={() =>
                this.setState(() => ({
                  toggleCurrency: false,
                  toggleCart: false,
                }))
              }
              style={{
                visibility: toggleCart || toggleCurrency ? "visible" : "hidden",
                backgroundColor: toggleCart
                  ? "rgba(57, 55, 72, 0.22)"
                  : "transparent",
                transition: "all 150ms ease",
              }}
            ></Styled.Overlay>
            <button
              style={{
                border: "none",
                display: "flex",
                alignContent: "center",
                backgroundColor: "white",
                cursor: "pointer",
                padding: 0,
              }}
              onClick={() =>
                this.setState(() => ({
                  toggleCart: !toggleCart,
                }))
              }
            >
              {cartCount > 0 && <Styled.Items>{cartCount}</Styled.Items>}
              <img
                src={cartLogo}
                style={{ margin: "auto 0" }}
                width={20}
                height={20}
                alt="Cart Logo"
              />
            </button>
            <Styled.MiniCart style={{ top: toggleCart ? "" : "-100vh" }}>
              <Styled.MiniWrapper>
                <Styled.Title>
                  My Bag,
                  <Styled.SubTitle>
                    {cartCount}
                    {cartCount === 1 ? " item" : " items"}
                  </Styled.SubTitle>
                </Styled.Title>
                <CartItems mini />
                <Styled.Total>
                  Total:
                  <div style={{ marginLeft: "auto" }}>
                    {currency.symbol +
                      (
                        this.getTotalPrice() +
                        this.getTotalPrice() * 0.21
                      ).toFixed(2)}{" "}
                  </div>
                </Styled.Total>
                <Styled.ButtonWrap>
                  <Bag
                    to={"/cart"}
                    onClick={() =>
                      this.setState(() => ({
                        toggleCart: false,
                        toggleCurrency: false,
                      }))
                    }
                  >
                    VIEW BAG
                  </Bag>
                  <Styled.Checkout onClick={() => dispatch(clearCart())}>
                    CHECK OUT
                  </Styled.Checkout>
                </Styled.ButtonWrap>
              </Styled.MiniWrapper>
            </Styled.MiniCart>
          </Styled.Actions>
        </Styled.Wrapper>
      </Styled.Header>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  data: state.Categories.map((cat) => cat.name),
  currencyList: state.App.currencies,
  currency: state.App.currentCurrency,
  cartCount: state.Cart.reduce(
    (preVal, currVal) => (preVal = preVal + currVal.quantity),
    0
  ),
  items: state.Cart,
});

export default connect(mapStateToProps)(MainHeader);

const SLink = styled(NavLink)`
  font-family: Raleway;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: center;
  padding: 0 16px;
`;
export const Bag = styled(NavLink)`
  width: 100%;
  padding: 13px 0;
  color: #1d1f22;
  border: #1d1f22 1px solid;
  background-color: white;
  font-family: Raleway;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: #1d1f22;
    color: white;
  }
`;
