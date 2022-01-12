import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container my-5">
          <div className="row">
            <div className="col-md-4">
              <News title={"Code With Harry"} description={"Lorum Ispum"} />
            </div>
            <div className="col-md-4">
              <News title={"Code With Harry"} description={"Lorum Ispum"} />
            </div>
            <div className="col-md-4">
              <News title={"Code With Harry"} description={"Lorum Ispum"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
