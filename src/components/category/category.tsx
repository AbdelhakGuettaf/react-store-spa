import React from "react";
import { CategoryType } from "../../types/types";
import styled from "styled-components";
import Products from "../product/products";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { Dispatch } from "@reduxjs/toolkit";
import { getPLPData } from "../../utils/functions";

interface CategoryProps {
  data: CategoryType;
  dispatch: Dispatch;
}

class Category extends React.Component<CategoryProps> {
  capitalizeFirstLetter = (text: String) => {
    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
  };

  render() {
    const { data } = this.props;
    const { name, products } = data;
    return (
      <MainWrapper>
        <Title>{this.capitalizeFirstLetter(name)}</Title>
        {products && <Products products={data.products} />}
      </MainWrapper>
    );
  }
  async componentDidUpdate() {
    getPLPData(this.props.data.name);
  }
  componentDidMount = async () => {
    getPLPData(this.props.data.name);
  };
}

const mapStateToProps = (state: RootState) => ({});

export default connect(mapStateToProps)(Category);

const Title = styled.h1`
  //styleName: Heading / Desktop / H2;
  font-family: Raleway;
  font-size: 42px;
  font-weight: 400;
  line-height: 67px;
  letter-spacing: 0px;
  text-align: left;
  margin: 50px 7%;
`;
const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
