import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import Attributes from "../attributes/Attributes";
import Carousel from "../Carousel/Carousel";
import Price from "../Price";
import {
  cartItemType,
  decrementCount,
  incrementCount,
  removeFromCart,
} from "./cart.slice";
import * as Styled from "./cartitem.styling";

interface CartItemProps {
  item: cartItemType;
  mini?: boolean;
  dispatch: Dispatch;
}

class CartItem extends React.Component<CartItemProps> {
  render() {
    const { mini, dispatch, item } = this.props;
    const {
      product: { brand, name, gallery, prices, attributes, id },
      quantity,
    } = item;
    return (
      <Styled.CartItemWrap
        style={{ minHeight: mini ? "150px" : "300px", maxHeight: "auto" }}
      >
        <Styled.LeftVStack
          style={{
            gap: mini ? "4" : "15px",
            minWidth: mini ? "50%" : "200px",
          }}
        >
          <Styled.Brand
            style={{
              fontSize: mini ? "16px" : "",
              fontWeight: mini ? "300" : "",
            }}
          >
            {brand}
          </Styled.Brand>
          <Styled.Name
            style={{
              fontSize: mini ? "16px" : "",
              fontWeight: mini ? "300" : "",
            }}
          >
            {name}
          </Styled.Name>
          <div>
            <Price
              price={prices}
              size={mini ? 16 : 24}
              wieght={mini ? "500" : "700"}
            />
          </div>
          <Attributes
            size={mini ? "s" : "lg"}
            cart={item.id}
            productID={id}
            attributes={attributes}
          ></Attributes>
        </Styled.LeftVStack>
        <Styled.RightHStack>
          <Styled.Quantity
            style={{
              width: mini ? "24px" : "",
              marginRight: mini ? "" : "24px",
            }}
          >
            <Styled.TopButton
              style={{
                fontSize: mini ? "16px" : "",
                fontWeight: mini ? "300" : "",
                lineHeight: mini ? "15px" : "",
              }}
              onClick={() => dispatch(incrementCount({ itemId: item.id }))}
            >
              +
            </Styled.TopButton>
            <Styled.Count
              style={{
                fontSize: mini ? "16px" : "",
                fontWeight: mini ? "500" : "",
              }}
            >
              {quantity}
            </Styled.Count>
            <Styled.BotButton
              style={{
                fontSize: mini ? "16px" : "",
                fontWeight: mini ? "300" : "",
              }}
              onClick={() => {
                if (quantity === 1) {
                  dispatch(removeFromCart({ itemId: item.id }));
                  return;
                }
                dispatch(decrementCount({ itemId: item.id }));
              }}
            >
              -
            </Styled.BotButton>
          </Styled.Quantity>
          <Styled.GalleryWrapper>
            {mini ? (
              <Styled.Img src={gallery[0]} alt="Product Gallery" />
            ) : (
              <Carousel imgs={gallery} />
            )}
          </Styled.GalleryWrapper>
        </Styled.RightHStack>
      </Styled.CartItemWrap>
    );
  }
}

export default connect()(CartItem);
