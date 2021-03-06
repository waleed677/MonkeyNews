import React, { Component } from "react";
import loader from "./loader.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}
