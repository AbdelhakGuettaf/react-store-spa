import React from "react";
import styled from "styled-components";

interface CarouselProps {
  imgs: string[];
}
type MyState = {
  currentImg: number;
};
class Carousel extends React.Component<CarouselProps, MyState> {
  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      currentImg: 0,
    };
  }

  next() {
    this.setState((state) => {
      if (state.currentImg !== this.props.imgs.length - 2) {
        return { currentImg: state.currentImg + 1 };
      }
      return { currentImg: 0 };
    });
  }
  previous() {
    this.setState((state) => {
      if (state.currentImg === 0) {
        return { currentImg: this.props.imgs.length - 2 };
      }
      return { currentImg: state.currentImg - 1 };
    });
  }

  render() {
    return (
      <>
        <Wrapper>
          <Img src={this.props.imgs[this.state.currentImg]} />
          {this.props.imgs.length > 1 && (
            <Buttons>
              <Previous onClick={() => this.previous()}>{"<"}</Previous>
              <Next onClick={() => this.next()}>{">"}</Next>
            </Buttons>
          )}
        </Wrapper>
      </>
    );
  }
}

export default Carousel;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-width: 100px;
`;
const Img = styled.img`
  display: block;
  max-width: 230px;
  width: 100%;
  margin: auto 0;
`;
const Buttons = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  height: 24px;
`;
const Previous = styled.button`
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
const Next = styled.button`
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
