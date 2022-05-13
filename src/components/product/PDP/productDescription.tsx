import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { NavigateFunction, Params } from "react-router-dom";
import { CategoryType } from "../../../types/types";
import withRouter from "../../../utils/routerHOC";
import { selectedAttributes } from "../../attributes/Atrributes.slice";
import ProductDetails from "./productDetails";
import ProductGallery from "./productGallery";
import * as Styled from "./PDP.styling";
import { getPDPData } from "../../../utils/functions";

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
    return (
      this.props.categories &&
      this.props.categories.map((cat) => {
        if (Array.isArray(cat.products)) {
          return cat.products.find(
            (product) => product.id === this.props.router.params.productID
          );
        }
      })[0]
    );
  }

  compononentDidUpdate() {
    getPDPData(this.props.router.params.productID!);
  }

  componentDidMount() {
    getPDPData(this.props.router.params.productID!);
  }

  render() {
    if (this.getProduct() === undefined) {
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
      <Styled.Wrapper>
        <Styled.Gallery>
          <ProductGallery
            inStock={this.getProduct()!.inStock}
            gallery={this.getProduct()!.gallery}
          ></ProductGallery>
        </Styled.Gallery>
        <Styled.Details>
          <ProductDetails product={this.getProduct()!} />
        </Styled.Details>
      </Styled.Wrapper>
    );
  }
}

export default withRouter(ProductDescription);
