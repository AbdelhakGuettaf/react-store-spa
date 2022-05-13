import styled from "styled-components";

export const Wrapper = styled.div`
  height: 60%;
  padding: 3% 7%;
  display: flex;
  flex: 12;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
export const Gallery = styled.div`
  flex: 4;
`;
export const Details = styled.div`
  flex: 2;
  padding: 2%;

  max-height: 100%;
`;

export const DetailsWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Brand = styled.div`
  font-family: Raleway;
  font-size: 2em;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
`;
export const Name = styled.div`
  margin-top: 16px;
  margin-bottom: 43px;
  font-family: Raleway;
  font-size: 30px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
`;
export const Span = styled.h1`
  margin-top: 12px;
  font-family: Roboto Condensed;
  font-size: 18px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
`;
export const CartButton = styled.button`
  border: none;
  color: #fff;
  padding: 16px 0;
  //styleName: --button-font;
  font-family: Raleway;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
`;
export const Description = styled.div`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
`;

export const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 2%;
`;
export const ImgSelector = styled.div`
  dispaly: flex;
  flex: 1;
  flex-direction: column;
  height: 60vh;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  min-width: 80px;
`;
export const ThumbWrap = styled.div`
  margin-top: 5%;
  &:hover {
    border: #5ece7b 1px solid;
  }
  position: relative;
`;
export const Thumb = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
export const MainWrapper = styled.div`
  display: flex;
  flex: 11;
  justify-content: center;
  align-items: center;
  height: 60vh;
  position: relative;
`;
export const MainImg = styled.img`
  object-fit: cover;
  max-width: 100%;
  height: 60vh;
`;
