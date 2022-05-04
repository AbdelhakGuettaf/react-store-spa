import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Category from "../components/category/category";
import { RootState } from "../store/store";
import { CategoryType } from "../types/types";

interface CategoriesProps {
  dispatch: Dispatch;
  data: CategoryType[];
  currency: string;
}

class Categories extends React.Component<CategoriesProps> {
  getCats() {
    return (
      <>
        <Routes>
          {this.props.data.map((category, key) => {
            return (
              <Route
                key={key}
                path={`${category.name}`}
                element={<Category data={category} />}
              />
            );
          })}
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </>
    );
  }
  render() {
    return <>{this.getCats()}</>;
  }
  componentDidMount() {}
}

const mapStateToProps = (state: RootState) => ({
  data: state.Categories,
  currency: state.App.currency,
});

export default connect(mapStateToProps)(Categories);
