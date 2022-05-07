import React from "react";
import { client, Query, Field } from "@tilework/opus";
import { connect } from "react-redux";
import { RootState } from "./store/store";
import { Dispatch } from "@reduxjs/toolkit";
import { CategoryType } from "./types/types";
import { addCategories } from "./components/categories.slice";
import { Navigate, Route, Routes } from "react-router-dom";
import MainHeader from "./components/header/Header";
import Categories from "./pages/Categories";
import "./assets/css/fonts.css";
import { addToCart } from "./components/cart/cart.slice";
import Cart from "./pages/Cart";
interface Props {
  dispatch: Dispatch;
  data: CategoryType[];
  currency: string;
}
type State = {
  loading: boolean;
};
class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount = async () => {
    client.setEndpoint("http://localhost:4000/");
    const query = new Query("categories", true).addField("name").addField(
      new Field("products", true)
        .addField("name")
        .addField("gallery", true)
        .addFieldList(["name", "inStock", "id", "description", "brand"])
        .addField(
          new Field("attributes", true)
            .addFieldList(["id", "name", "type"])
            .addField(
              new Field("items", true).addFieldList([
                "displayValue",
                "value",
                "id",
              ])
            )
        )
        .addField(
          new Field("prices", true)
            .addField("amount")
            .addField(new Field("currency").addFieldList(["label", "symbol"]))
        )
    );
    const queryResult = await client.post(query); // returns Categories with their products
    /*const sQ = new Query("product")
      .addArgument("id", "String!", "apple-iphone-12-pro")
      .addFieldList(["name", "id"]);*/
    const f: CategoryType[] = []; // Temporary array mutated to render only once
    queryResult.categories.map((cat) => f.push(cat as CategoryType)); // Array mutated here to include all categories including their products
    this.props.dispatch(addCategories(f));
    this.props.dispatch(
      addToCart({
        id: Date.now(),
        product: f[0].products[0],
        attribs: [{ id: "Size", itemId: "42" }],
        quantity: 1,
      })
    );
    this.props.dispatch(
      addToCart({
        id: Date.now() + 1,
        product: f[2].products[0],
        attribs: [
          {
            id: "Color",
            itemId: "Green",
          },
          {
            id: "Capacity",
            itemId: "1T",
          },
        ],
        quantity: 2,
      })
    );
    this.setState(() => ({ loading: false }));
  };
  render() {
    console.log("Render"); // Render Counter
    console.log("==============="); // Render Counter
    if (this.state.loading)
      return (
        <h1 style={{ textAlign: "center", marginTop: "20%" }}>Loading...</h1>
      );
    return (
      <>
        <MainHeader />
        <Routes>
          <Route
            path="/"
            element={
              this.props.data[0] ? (
                <Navigate to={`/${this.props.data[0].name}`} replace />
              ) : (
                <div>No Data</div>
              )
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<Categories />} />
        </Routes>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  data: state.Categories,
  currency: state.App.currency,
});

export default connect(mapStateToProps)(App);
