import styled from "styled-components";

export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 6%;
  gap: 2.5%;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const OutOfStock = styled.div`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0px;
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  opacity: 0.4;
`;
export const CircleIcon = styled.img`
  width: 20%;
  height: 20%;
  position: relative;
  z-index: 100;
  left: 80%;
  top: -10%;
  opacity: 0;
  transition: all 200ms ease-in-out;
  border-radius: 50%;
  &:hover {
    transform: scale(1.2);
  }
`;
export const CardWrapper = styled.div`
  margin-bottom: 100px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  width: 350px;
  left: 100px;
  top: 331px;
  border-radius: 0px;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    cursor: pointer;
    ${CircleIcon} {
      opacity: 1;
    }
  }
`;
export const ImgWrap = styled.div`
  width: cal(100%-32x);
  height: 346px;
`;
export const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 330px;
  border-radius: 0px;
`;
export const Content = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  height: 58px;
  width: 100%;
  left: 16px;
  top: 370px;
  border-radius: 0px;
`;

export const ContentTitle = styled.span`
  font-family: Raleway;
  font-size: 18px;
  font-weight: 300;
  line-height: 29px;
  letter-spacing: 0px;
  text-align: left;
`;
