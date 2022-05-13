import React from "react";
import { connect } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../../store/store";
import { ProductType } from "../../types/types";
import Price from "../Price";
import CartLogo from "../../assets/Circle-Icon.svg";
import { selectedAttributes } from "../attributes/Atrributes.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { addToCart } from "../cart/cart.slice";
import { getAttributes } from "../../utils/functions";
import * as Styled from "./productStyling";

interface productProps {
  product: ProductType;
  navigate: NavigateFunction;
  location: Location;
  attributeState: selectedAttributes[];
  dispatch: Dispatch;
}

class Product extends React.Component<productProps> {
  render() {
    const { navigate, product, attributeState, dispatch } = this.props;
    const { id, inStock, name, gallery, brand, prices } = product;
    return (
      <Styled.CardWrapper
        onClick={(e: any) => {
          if (e.target.alt === "icon") return;
          navigate(`${id}`);
        }}
      >
        <div style={{ position: "relative" }}>
          {!inStock && (
            <Styled.OutOfStock>
              <div style={{ margin: "40% auto" }}>OUT OF STOCK</div>
            </Styled.OutOfStock>
          )}
          <Styled.ImgWrap>
            <Styled.Img src={gallery && gallery[0]} alt={name + brand} />
            {inStock && (
              <Styled.CircleIcon
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: Date.now(),
                      product: product,
                      quantity: 1,
                      attribs: getAttributes(product, attributeState),
                    })
                  )
                }
                src={CartLogo}
                alt="icon"
              />
            )}
          </Styled.ImgWrap>

          <Styled.Content>
            <Styled.ContentTitle>{brand + " " + name}</Styled.ContentTitle>
            <Price size={18} wieght="500" price={prices} />
          </Styled.Content>
        </div>
      </Styled.CardWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  attributeState: state.Attributes,
});

export default connect(mapStateToProps)(Product);
