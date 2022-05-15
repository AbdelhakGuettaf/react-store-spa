import React from "react";
import { NavigateFunction, Params } from "react-router-dom";
import { ProductType } from "../../types/types";
import withRouter from "../../utils/routerHOC";
import Product from "./product";
import { CardsWrapper } from "./productStyling";
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
    const {
      products,
      router: { location, navigate },
    } = this.props;
    return (
      <CardsWrapper>
        {products.map((product, key) => (
          <Product
            navigate={navigate}
            location={location}
            key={key}
            product={product}
          />
        ))}
      </CardsWrapper>
    );
  }
}
export default withRouter(Products);
