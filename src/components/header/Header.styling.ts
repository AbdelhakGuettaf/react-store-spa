import styled from "styled-components";

export const Checkout = styled.button`
  width: 100%;
  padding: 13px 0;
  font-family: Raleway;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: center;
  background-color: #5ece7b;
  color: white;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;
export const ButtonWrap = styled.div`
  margin: 32px 0;
  display: flex;
  flex-directino: row;
  width: 100%;
  gap: 12px;
`;
export const Total = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0em;
  display: flex;
  flex-directino: row;
`;

export const Title = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: 0em;
  display: flex;
  flex-directino: row;
  margin: 32px 0;
`;
export const SubTitle = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: 0em;
`;
export const MiniWrapper = styled.div`
  position: relative;
  padding: 5px 16px;
`;
export const MiniCart = styled.div`
  position: absolute;
  right: -2%;
  top: 80px;
  max-height: 60vh;
  min-width: 290px;
  width: 27%;
  background: white;
  overflow-x: hidden;
  overflow-y: scroll;
`;
export const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  top: 80px;
  right: 0;
  padding: 0;
  margin: 0;
`;
export const CurrencyList = styled.div`
  position: absolute;
  min-width: 100px;
  width: 7%;
  height: 100vh;
  right: -2%;
  z-index: 99;
`;
export const CurrencyItem = styled.div`
  font-family: Raleway;
  font-size: 18px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: right;
  cursor: pointer;
  width: 100%;
  position: absolute;
  top: 70px;
`;
export const TR = styled.tr`
  margin-top: 5px;

  background-color: white;
  &:hover {
    background: #eeeeee;
  }
`;
export const TD = styled.td`
  margin: 0 5px;
  padding: 9px 5px;
`;
export const Currency = styled.div`
  //styleName: --price-regular-font;
  font-family: Raleway;
  font-size: 18px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  margin: auto 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Items = styled.div`
  position: absolute;
  margin: auto 10px;
  width: 20px;
  height: 20px;
  background-color: #1d1f22;
  border-radius: 50%;
  color: white;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
`;

export const Header = styled.header`
  width: 100%;
  height: 80px;
  background-color: white;
  left: 0px;
  top: 80px;
`;

export const Wrapper = styled.div`
  width: 86%;
  height: 80px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  z-index: 10;
  margin-left: 7%;
`;

export const Nav = styled.div`
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const NavLinksWrap = styled.div`
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column-reverse;
  margin-right: auto;
`;

export const Actions = styled.div`
  align-self: flex-end;
  height: 40px;
  background: white;
  display: flex;
  flex-direction: row;
  padding: auto 10px;
  gap: 20px;
  margin: auto 0;
  z-index: 1;
`;
export const Img = styled.img`
  align-self: center;
  position: absolute;
  @media (max-width: 768px) {
    display: none;
  }
`;
