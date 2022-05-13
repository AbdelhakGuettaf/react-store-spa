import React from "react";
import { connect } from "react-redux";
import { selectedAttributes } from "../components/attributes/Atrributes.slice";
import ProductDescription from "../components/product/PDP/productDescription";
import { RootState } from "../store/store";
import { CategoryType } from "../types/types";
import { getPDPData } from "../utils/functions";

interface PDPProps {
  attributeState: selectedAttributes[];
  categories: CategoryType[];
}

class ProductDescriptionPage extends React.Component<PDPProps> {
  render() {
    return (
      <ProductDescription
        categories={this.props.categories}
        attributeState={this.props.attributeState}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  attributeState: state.Attributes,
  categories: state.Categories,
});

export default connect(mapStateToProps)(ProductDescriptionPage);
