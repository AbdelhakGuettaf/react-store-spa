import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { cartItemType } from "./cart.slice";
import CartItem from "./cartItem";

interface CartItemsProps {
  items: cartItemType[];
  mini?: boolean;
}

class CartItems extends React.Component<CartItemsProps> {
  render() {
    return (
      <ItemsWrapper>
        {this.props.items.map((item, key) => (
          <CartItem mini={this.props.mini} item={item} key={key} />
        ))}
      </ItemsWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: state.Cart,
});

export default connect(mapStateToProps)(CartItems);

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: #e5e5e5 1px solid;
  margin-bottom: 32px;
`;
