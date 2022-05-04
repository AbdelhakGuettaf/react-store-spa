import React from "react";
import { AttributeSet } from "../../types/types";
import AttributeItem from "./AttributeItem";

interface AtributesProps {
  attributes: [(AttributeSet | undefined)?];
  productID: string;
  cart?: number;
}

class Attributes extends React.Component<AtributesProps> {
  render() {
    return (
      <>
        {this.props.attributes[0] &&
          this.props.attributes.map((attrib, idx) => {
            return (
              attrib && (
                <AttributeItem
                  cartId={this.props.cart}
                  attributes={attrib}
                  productID={this.props.productID}
                  size="lg"
                  key={idx}
                />
              )
            );
          })}
      </>
    );
  }
}

export default Attributes;
