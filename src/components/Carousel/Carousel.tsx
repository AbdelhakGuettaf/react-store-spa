import React from "react";
import * as Styled from "./Carousel.styling";

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
    const { imgs } = this.props;
    return (
      <>
        <Styled.Wrapper>
          <Styled.Img src={imgs[this.state.currentImg]} />
          {imgs.length > 1 && (
            <Styled.Buttons>
              <Styled.Previous onClick={() => this.previous()}>
                {"<"}
              </Styled.Previous>
              <Styled.Next onClick={() => this.next()}>{">"}</Styled.Next>
            </Styled.Buttons>
          )}
        </Styled.Wrapper>
      </>
    );
  }
}

export default Carousel;
