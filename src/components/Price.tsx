import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store/store";
import { Price as PriceType } from "../types/types";

interface PriceProps {
  currency: string;
  wieght: string;
  size: number;
  price: PriceType[];
}

class Price extends React.Component<PriceProps> {
  getPrice() {
    if (this.props.price !== undefined && this.props.price[0] !== undefined) {
      return this.props.price
        .filter((price) => price.currency.label === this.props.currency)
        .map((price) => {
          return price.currency.symbol + price.amount.toFixed(2).toString();
        });
    }
  }
  render() {
    return (
      <PriceTag
        style={{
          fontWeight: this.props.wieght,
          fontSize: this.props.size,
        }}
      >
        {this.getPrice()}
      </PriceTag>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: state.App.currentCurrency.currency,
});

export default connect(mapStateToProps)(Price);

const PriceTag = styled.span`
  //styleName: --price-regular-font;
  font-family: Raleway;
  line-height: 29px;
  letter-spacing: 0em;
`;
