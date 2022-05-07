import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { NavigateFunction, Params } from "react-router-dom";
import styled from "styled-components";
import { CategoryType } from "../../types/types";

import withRouter from "../../utils/routerHOC";
import { selectedAttributes } from "../attributes/Atrributes.slice";
import ProductDetails from "./productDetails";
import ProductGallery from "./productGallery";

interface PDPProps {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
  };
  dispatch: Dispatch;
  attributeState: selectedAttributes[];
  categories: CategoryType[];
}

class ProductDescription extends React.Component<PDPProps> {
  getProduct() {
    return this.props.categories.map(
      (cat) =>
        cat.products.filter(
          (product) => product.id === this.props.router.params.productID
        )[0]
    )[0];
  }

  render() {
    if (!this.getProduct()) {
      return (
        <div style={{ marginTop: "20%" }}>
          <h1 style={{ textAlign: "center" }}>
            No product found
            <br />
            <a href="/" style={{ color: "#5ECE7B" }}>
              Go back
            </a>
          </h1>
        </div>
      );
    }
    return (
      <Wrapper>
        <Gallery>
          <ProductGallery gallery={this.getProduct().gallery}></ProductGallery>
        </Gallery>
        <Details>
          <ProductDetails product={this.getProduct()} />
        </Details>
      </Wrapper>
    );
  }
}

export default withRouter(ProductDescription);

const Wrapper = styled.div`
  height: 60%;
  padding: 3% 7%;
  display: flex;
  flex: 12;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
const Gallery = styled.div`
  flex: 4;
`;
const Details = styled.div`
  flex: 2;
  padding: 2%;

  max-height: 100%;
`;
