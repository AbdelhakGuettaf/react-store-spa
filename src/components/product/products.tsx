import React from "react";
import { NavigateFunction, Params } from "react-router-dom";
import styled from "styled-components";
import { ProductType } from "../../types/types";
import withRouter from "../../utils/routerHOC";
import Product from "./product";
interface productsProps {
  products: ProductType[];
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
}

class Products extends React.Component<productsProps> {
  render() {
    return (
      <CardsWrapper>
        {this.props.products.map((product, key) => (
          <Product
            navigate={this.props.router.navigate}
            location={this.props.router.location}
            key={key}
            product={product}
          />
        ))}
      </CardsWrapper>
    );
  }
}
export default withRouter(Products);

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 6%;
  gap: 2.5%;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
