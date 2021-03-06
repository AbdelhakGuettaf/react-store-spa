import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Category from "../components/category/category";
import { RootState } from "../store/store";
import { CategoryType } from "../types/types";
import Product from "./Product";

interface CategoriesProps {
  dispatch: Dispatch;
  data: CategoryType[];
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
          <Route
            path="/*"
            element={
              <Routes>
                {this.props.data.map((category, key) => {
                  return (
                    <Route
                      key={key}
                      path={`${category.name}/:productID`}
                      element={<Product />}
                    />
                  );
                })}
              </Routes>
            }
          />
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
});

export default connect(mapStateToProps)(Categories);
