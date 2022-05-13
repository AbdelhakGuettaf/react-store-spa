import React from "react";
import { client } from "@tilework/opus";
import { connect } from "react-redux";
import { RootState } from "./store/store";
import { Dispatch } from "@reduxjs/toolkit";
import { CategoryType } from "./types/types";
import { addCategories } from "./components/categories.slice";
import { Navigate, Route, Routes } from "react-router-dom";
import MainHeader from "./components/header/Header";
import Categories from "./pages/Categories";
import "./assets/css/fonts.css";
import Cart from "./pages/Cart";
import { CATEGORIES, CURRENCIES } from "./utils/queries";
import { addCurrencies } from "./app/app.slice";
interface Props {
  dispatch: Dispatch;
  data: CategoryType[];
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
    const getCategoryNames = await client.post(CATEGORIES);
    const getCurrencies = await client.post(CURRENCIES);
    this.props.dispatch(addCategories(getCategoryNames.categories));
    this.props.dispatch(addCurrencies(getCurrencies as any));
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
});

export default connect(mapStateToProps)(App);
