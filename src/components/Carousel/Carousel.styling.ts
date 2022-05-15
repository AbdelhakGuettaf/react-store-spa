import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-width: 100px;
`;
export const Img = styled.img`
  display: block;
  max-width: 230px;
  max-height: 300px;
  margin: auto 0;
  object-fit: cover;
`;
export const Buttons = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  height: 24px;
`;
export const Previous = styled.button`
  postition: absolute;
  bottom: 16;
  right: 16;
  height: 24px;
  width: 24px;
  background: rgba(0, 0, 0, 0.73);
  color: #ffffff;
  font-size: 15px;
  margin-right: 8px;
  border: none;
  &:active {
    background: #fff;
    color: black;
  }
`;
export const Next = styled.button`
  postition: absolute;
  bottom: 16;
  right: 30;
  height: 24px;
  width: 24px;
  background: rgba(0, 0, 0, 0.73);
  color: #ffffff;
  font-size: 15px;
  border: none;
  &:active {
    background: #fff;
    color: black;
  }
`;
