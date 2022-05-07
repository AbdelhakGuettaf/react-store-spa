import React from "react";
import styled from "styled-components";

interface Props {
  gallery: string[];
}

type State = {
  currentImg: number;
};

class ProductGallery extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentImg: 0,
    };
  }
  handleClick(index: number) {
    this.setState(() => {
      return { currentImg: index };
    });
  }
  render() {
    return (
      <GalleryWrapper>
        <ImgSelector>
          {this.props.gallery.map((img, index) => (
            <ThumbWrap key={index}>
              <Thumb
                onClick={() => this.handleClick(index)}
                src={img}
                alt={"Product Thumbnail"}
              />
            </ThumbWrap>
          ))}
        </ImgSelector>
        <MainWrapper>
          <MainImg src={this.props.gallery[this.state.currentImg]} />
        </MainWrapper>
      </GalleryWrapper>
    );
  }
}

export default ProductGallery;

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  gap: 2%;
`;
const ImgSelector = styled.div`
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
const ThumbWrap = styled.div`
  margin-top: 5%;
  &:hover {
    border: #5ece7b 1px solid;
  }
`;
const Thumb = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
const MainWrapper = styled.div`
  display: flex;
  flex: 11;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;
const MainImg = styled.img`
  object-fit: cover;
  max-width: 100%;
  height: 60vh;
`;
