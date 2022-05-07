import React from "react";
import { connect } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { ProductType } from "../../types/types";
import Price from "../Price";
import CartLogo from "../../assets/Circle-Icon.svg";
import { selectedAttributes } from "../attributes/Atrributes.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { addToCart } from "../cart/cart.slice";
import { getAttributes } from "../../utils/functions";

interface productProps {
  product: ProductType;
  currency: string;
  navigate: NavigateFunction;
  location: Location;
  attributeState: selectedAttributes[];
  dispatch: Dispatch;
}

class Product extends React.Component<productProps> {
  render() {
    return (
      <CardWrapper
        onClick={(e: any) => {
          if (e.target.alt === "icon") return;
          this.props.navigate(`${this.props.product.id}`);
        }}
      >
        <div style={{ position: "relative" }}>
          {!this.props.product.inStock && (
            <OutOfStock>
              <div style={{ margin: "40% auto" }}>OUT OF STOCK</div>
            </OutOfStock>
          )}
          <ImgWrap>
            <Img
              src={this.props.product.gallery[0]}
              alt={this.props.product.name + this.props.product.brand}
            />
            {this.props.product.inStock && (
              <CircleIcon
                onClick={() =>
                  this.props.dispatch(
                    addToCart({
                      id: Date.now(),
                      product: this.props.product,
                      quantity: 1,
                      attribs: getAttributes(
                        this.props.product,
                        this.props.attributeState
                      ),
                    })
                  )
                }
                src={CartLogo}
                alt="icon"
              />
            )}
          </ImgWrap>

          <Content>
            <ContentTitle>
              {this.props.product.brand + " " + this.props.product.name}
            </ContentTitle>
            <Price size={18} wieght="500" price={this.props.product.prices} />
          </Content>
        </div>
      </CardWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: state.App.currency,
  attributeState: state.Attributes,
});

export default connect(mapStateToProps)(Product);
const OutOfStock = styled.div`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0px;
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  opacity: 0.4;
`;
const CircleIcon = styled.img`
  width: 20%;
  height: 20%;
  position: relative;
  z-index: 100;
  left: 80%;
  top: -10%;
  opacity: 0;
  transition: all 200ms ease-in-out;
  border-radius: 50%;
  &:hover {
    transform: scale(1.2);
  }
`;
const CardWrapper = styled.div`
  margin-bottom: 100px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  width: 350px;
  left: 100px;
  top: 331px;
  border-radius: 0px;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    cursor: pointer;
    ${CircleIcon} {
      opacity: 1;
    }
  }
`;
const ImgWrap = styled.div`
  width: cal(100%-32x);
  height: 346px;
`;
const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 330px;
  border-radius: 0px;
`;
const Content = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  height: 58px;
  width: 100%;
  left: 16px;
  top: 370px;
  border-radius: 0px;
`;

const ContentTitle = styled.span`
  font-family: Raleway;
  font-size: 18px;
  font-weight: 300;
  line-height: 29px;
  letter-spacing: 0px;
  text-align: left;
`;
