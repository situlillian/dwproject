import React, { Component } from "react";
import NumericLabel from "react-pretty-numbers";

class PopulationDetail extends Component {
  render() {
    let country = this.props.country;
    let headerText = country.name ? country.name : "Select a Country";
    const option = {
      justification: "C",
      commafy: true
    };

    return (
      <div className="detailBox col-md-4">
        <h2 className="">{headerText}</h2>
        <p>
          Population:{" "}
          <span className="queryResultText">
            <NumericLabel>{country.population}</NumericLabel>
          </span>
        </p>
        <p>Flag:</p>
        <img className="flag" src={country.flag} />
      </div>
    );
  }
}

export default PopulationDetail;
