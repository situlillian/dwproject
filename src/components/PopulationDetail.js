import React, { Component } from "react";

class PopulationDetail extends Component {
  render() {
    let headerText = this.props.country ? this.props.country : "Country";
    return (
      <div className="detailBox">
        <h2 className="">{headerText}</h2>
        <p>
          Population: <span className="queryResultText">{this.props.population}</span>
        </p>
      </div>
    );
  }
}

export default PopulationDetail;
