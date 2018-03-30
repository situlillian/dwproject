import React from "react";
import ReactDOM from "react-dom";
import logo from "../static/GlobeLogo2.png";
import map from "../static/mapBGsmaller.png";

const Header = ({ handleScrollToElement }) => {
  return (
    <div className="header">
      <div className="row">
        <div className="col-12 text-left">
          <img className="logo d-inline" src={logo} />
          <h1 className="worldStatsText d-inline">World Stats</h1>
          <p className="text-uppercase">Beta</p>
        </div>
        <div className="row align-items-center">
          <div className="col-md-4">
            <p className="instructions">Find population statistics on a map.</p>
            <button className="detailsScrollDown" onClick={handleScrollToElement}>
              Get Started
            </button>
          </div>
          <div className="col-md-8 container">
            <img className="bgMap" src={map} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
