import styled from "styled-components";

export const CartItemWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  border-top: #e5e5e5 1px solid;
  padding: 24px 0;
`;
export const LeftVStack = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`;
export const Brand = styled.div`
  font-family: Raleway;
  font-size: 30px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
`;
export const Name = styled.div`
  font-family: Raleway;
  font-size: 30px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
`;
export const RightHStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
export const GalleryWrapper = styled.div`
  display: flex;
  width: 200px;
`;
export const Quantity = styled.div`
  width: 45px;
  top: 0;
  bottom: 0;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const TopButton = styled.button`
  cursor: pointer;
  aspect-ratio: 1;
  background-color: #fff;
  border: #1d1f22 1px solid;
  font-size: 30px;
  font-family: sand-serif;
  font-size: 30px;
  font-weight: 300;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: center;
  &:active {
    background-color: #1d1f22;
    color: #fff;
  }
`;
export const Count = styled.div`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 500;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: center;
`;
export const BotButton = styled.button`
  cursor: pointer;
  aspect-ratio: 1;
  background-color: #fff;
  border: #1d1f22 1px solid;
  font-size: 50px;
  font-family: sand-serif;
  font-size: 30px;
  font-weight: 300;
  &:active {
    background-color: #1d1f22;
    color: #fff;
  }
`;
export const Img = styled.img`
  display: block;
  width: 80%;
  max-height: 150px;
  object-fit: cover;
`;
