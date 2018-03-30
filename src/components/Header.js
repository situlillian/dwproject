import React from "react";
import ReactDOM from "react-dom";
import logo from "../static/GlobeLogo2.png";
import map from "../static/mapBGsmaller.png";
import chevrondown from "../static/ChevronDown.png";

const Header = ({ handleScrollToElement }) => {
  return (
    <div className="header">
      <div className="row logoHeader">
        <div className="col-12 text-left">
          <img className="d-inline logo" src={logo} />
          <h1 className="d-inline align-middle">World Stats</h1>
          <p className="d-inline align-text-bottom text-uppercase logoBeta">Beta</p>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-4">
            <p className="headerCTA">
              Find population <br />statistics on a map
            </p>
            <button className="ctaBtn" onClick={handleScrollToElement}>
              Get Started
            </button>
          </div>
          <div className="col-md-7">
            <img className="bgMap" src={map} />
          </div>
          <div className="col-12 align-self-end">
            <img className="chevrondown" src={chevrondown} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
