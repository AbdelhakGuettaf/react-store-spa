import React from "react";
import { OutOfStock } from "../productStyling";
import * as Styled from "./PDP.styling";

interface Props {
  gallery: string[];
  inStock: boolean;
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
    const { gallery, inStock } = this.props;
    return (
      <Styled.GalleryWrapper>
        <Styled.ImgSelector>
          {gallery.map((img, index) => (
            <Styled.ThumbWrap key={index}>
              <Styled.Thumb
                onClick={() => this.handleClick(index)}
                src={img}
                alt={"Product Thumbnail"}
              />
            </Styled.ThumbWrap>
          ))}
        </Styled.ImgSelector>
        <Styled.MainWrapper>
          {!inStock && (
            <OutOfStock>
              <div style={{ margin: " auto" }}>OUT OF STOCK</div>
            </OutOfStock>
          )}
          <Styled.MainImg src={gallery[this.state.currentImg]} />
        </Styled.MainWrapper>
      </Styled.GalleryWrapper>
    );
  }
}

export default ProductGallery;
