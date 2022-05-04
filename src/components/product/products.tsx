import React from "react";
import styled from "styled-components";
import { ProductType } from "../../types/types";
import Product from "./product";

interface productsProps {
  products: ProductType[];
}

class Products extends React.Component<productsProps> {
  render() {
    return (
      <CardsWrapper>
        {this.props.products.map((product, key) => (
          <Product key={key} product={product} />
        ))}
      </CardsWrapper>
    );
  }
}
export default Products;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 60px;
`;
