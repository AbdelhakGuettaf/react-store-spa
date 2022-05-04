import React from "react";
import { CategoryType } from "../../types/types";
import styled from "styled-components";
import Products from "../product/products";

interface CategoryProps {
  data: CategoryType;
}

class Category extends React.Component<CategoryProps> {
  capitalizeFirstLetter = (text: String) => {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
  };
  render() {
    return (
      <MainWrapper>
        <Title>{this.capitalizeFirstLetter(this.props.data.name)}</Title>
        <Products products={this.props.data.products} />
      </MainWrapper>
    );
  }

  componentDidMount() {}
}

export default Category;

const Title = styled.h1`
  //styleName: Heading / Desktop / H2;
  font-family: Raleway;
  font-size: 42px;
  font-weight: 400;
  line-height: 67px;
  letter-spacing: 0px;
  text-align: left;
  margin: 50px 100px;
`;
const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
