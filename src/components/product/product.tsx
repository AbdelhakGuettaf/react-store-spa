import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { ProductType } from "../../types/types";
import Price from "../Price";

interface productProps {
  product: ProductType;
  currency: string;
}

class Product extends React.Component<productProps> {
  render() {
    return (
      <>
        <CardWrapper>
          <ImgWrap>
            <Img
              src={this.props.product.gallery[0]}
              alt={this.props.product.name + this.props.product.brand}
            />
          </ImgWrap>

          <Content>
            <ContentTitle>
              {this.props.product.brand + " " + this.props.product.name}
            </ContentTitle>
            <Price size={18} wieght="500" price={this.props.product.prices} />
          </Content>
        </CardWrapper>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currency: state.App.currency,
});

export default connect(mapStateToProps)(Product);

const CardWrapper = styled.div`
  margin-bottom: 100px;
  margin-left: 30px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  width: 370px;
  left: 100px;
  top: 331px;
  border-radius: 0px;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    cursor: pointer;
  }
`;
const ImgWrap = styled.div`
  width: 100%;
  height: 346px;
`;
const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 330px;
  border-radius: 0px;
`;
const Content = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  height: 58px;
  width: 354px;
  left: 16px;
  top: 370px;
  border-radius: 0px;
`;

const ContentTitle = styled.span`
  font-family: Raleway;
  font-size: 18px;
  font-weight: 300;
  line-height: 29px;
  letter-spacing: 0px;
  text-align: left;
`;
