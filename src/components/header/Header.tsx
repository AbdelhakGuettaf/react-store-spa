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
  getNames() {
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
    if (!this.props.currencyList[0]) return;
    return (
      <CurrencyItem>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <tbody>
            {this.props.currencyList.map((item, key) => (
              <TR
                style={{
                  backgroundColor:
                    item.label === this.props.currency.currency // current currency
                      ? "#eeeeee"
                      : "",
                }}
                key={key}
                onClick={() => {
                  this.props.dispatch(
                    changeCurrency({
                      symbol: item.symbol,
                      currency: item.label,
                    })
                  );
                  this.setState(() => ({ toggleCurrency: false }));
                }}
              >
                <TD>{item.symbol}</TD>
                <TD style={{ textAlign: "left" }}>{item.label}</TD>
              </TR>
            ))}
          </tbody>
        </table>
      </CurrencyItem>
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
    return (
      <Header>
        <Wrapper>
          <NavLinksWrap>
            <Nav style={{}}>{this.getNames()}</Nav>
          </NavLinksWrap>
          <Img src={logo} alt="Green Logo" />
          <Actions>
            <Currency
              onClick={() =>
                this.setState(() => ({
                  toggleCurrency: !toggleCurrency,
                }))
              }
            >
              <div>{this.props.currency.symbol}</div>
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
            </Currency>
            <CurrencyList
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
            </CurrencyList>
            <Overlay
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
            ></Overlay>
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
                  toggleCart: !this.state.toggleCart,
                }))
              }
            >
              {this.props.cartCount > 0 && (
                <Items>{this.props.cartCount}</Items>
              )}
              <img
                src={cartLogo}
                style={{ margin: "auto 0" }}
                width={20}
                height={20}
                alt="Cart Logo"
              />
            </button>
            <MiniCart style={{ top: toggleCart ? "" : "-100vh" }}>
              <MiniWrapper>
                <Title>
                  My Bag,
                  <SubTitle>
                    {this.props.cartCount}
                    {this.props.cartCount === 1 ? " item" : " items"}
                  </SubTitle>
                </Title>
                <CartItems mini />
                <Total>
                  Total:
                  <div style={{ marginLeft: "auto" }}>
                    {this.props.currency.symbol +
                      (
                        this.getTotalPrice() +
                        this.getTotalPrice() * 0.21
                      ).toFixed(2)}{" "}
                  </div>
                </Total>
                <ButtonWrap>
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
                  <Checkout onClick={() => this.props.dispatch(clearCart())}>
                    CHECK OUT
                  </Checkout>
                </ButtonWrap>
              </MiniWrapper>
            </MiniCart>
          </Actions>
        </Wrapper>
      </Header>
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

const Bag = styled(NavLink)`
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
const Checkout = styled.button`
  width: 100%;
  padding: 13px 0;
  font-family: Raleway;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  background-color: #5ece7b;
  color: white;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;
const ButtonWrap = styled.div`
  margin: 32px 0;
  display: flex;
  flex-directino: row;
  width: 100%;
  gap: 12px;
`;
const Total = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0em;
  display: flex;
  flex-directino: row;
`;

const Title = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0em;
  display: flex;
  flex-directino: row;
  margin: 32px 0;
`;
const SubTitle = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
`;
const MiniWrapper = styled.div`
  position: relative;
  padding: 5px 20px;
`;
const MiniCart = styled.div`
  position: absolute;
  right: -2%;
  top: 80px;
  height: 60vh;
  min-width: 290px;
  width: 27%;
  background: white;
  overflow-x: hidden;
  overflow-y: scroll;
`;
const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  top: 80px;
  right: 0;
  padding: 0;
  margin: 0;
`;
const CurrencyList = styled.div`
  position: absolute;
  min-width: 100px;
  width: 7%;
  height: 100vh;
  right: -2%;
  z-index: 99;
`;
const CurrencyItem = styled.div`
  font-family: Raleway;
  font-size: 18px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: right;
  cursor: pointer;
  width: 100%;
  position: absolute;
  top: 70px;
`;
const TR = styled.tr`
  margin-top: 5px;

  background-color: white;
  &:hover {
    background: #eeeeee;
  }
`;
const TD = styled.td`
  margin: 0 5px;
  padding: 9px 5px;
`;
const Currency = styled.div`
  //styleName: --price-regular-font;
  font-family: Raleway;
  font-size: 18px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  margin: auto 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Items = styled.div`
  position: absolute;
  margin: auto 10px;
  width: 20px;
  height: 20px;
  background-color: #1d1f22;
  border-radius: 50%;
  color: white;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
`;

const SLink = styled(NavLink)`
  font-family: Raleway;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: center;
  padding: 0 16px;
`;

const Header = styled.header`
  width: 100%;
  height: 80px;
  background-color: white;
  left: 0px;
  top: 80px;
`;

const Wrapper = styled.div`
  width: 86%;
  height: 80px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  z-index: 10;
  margin-left: 7%;
`;

const Nav = styled.div`
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const NavLinksWrap = styled.div`
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column-reverse;
  margin-right: auto;
`;

const Actions = styled.div`
  align-self: flex-end;
  height: 40px;
  background: white;
  display: flex;
  flex-direction: row;
  padding: auto 10px;
  gap: 20px;
  margin: auto 0;
  z-index: 1;
`;
const Img = styled.img`
  align-self: center;
  position: absolute;
  @media (max-width: 768px) {
    display: none;
  }
`;
