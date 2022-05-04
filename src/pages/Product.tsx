import React from "react";

class Index extends React.Component {
  render() {
    return <p></p>;
  }

  componentDidMount() {
    this.setState({
      someKey: "otherValue",
    });
  }
}

export default Index;
