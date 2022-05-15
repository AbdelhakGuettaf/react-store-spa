import styled from "styled-components";

export const Title = styled.h1`
  //styleName: Heading / Desktop / H2;
  font-family: Raleway;
  font-size: 42px;
  font-weight: 700;
  line-height: 67px;
  letter-spacing: 0px;
  text-align: left;
  margin: 50px 0;
`;
export const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 7%;
`;
export const Table = styled.table`
  min-width: 280px;
`;
export const TDProperty = styled.td`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
`;
export const TDValue = styled.td`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
`;
export const TDTotal = styled.td`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0em;
`;
export const Order = styled.button`
  margin-top: 20px;
  margin-bottom: 200px;
  background: #5ece7b;
  width: 100%;
  padding: 13px 0;
  border: none;
  font-family: Raleway;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
`;
