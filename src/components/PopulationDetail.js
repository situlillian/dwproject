import React, { Component } from "react";
import NumericLabel from "react-pretty-numbers";

class PopulationDetail extends Component {
  render() {
    let country = this.props.country;
    let headerText = country.name ? country.name : "Country";

    return (
      <div className="detailBox">
        <h2 className="">{headerText}</h2>
        <p>
          Population: <span className="queryResultText">{country.population}</span>
        </p>
        <p>Flag:</p>
        <img className="flag" src={country.flag} />
      </div>
    );
  }
}

export default PopulationDetail;
