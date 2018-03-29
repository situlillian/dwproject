import React, { Component } from "react";

class USAPopulationDetail extends Component {
  render() {
    let headerText = this.props.country ? this.props.country : "State";
    return (
      <div className="detailBox">
        <h2 className="">{headerText}</h2>
        <p>
          Some fun stuff goes here: <span className="queryResult'" />
        </p>
      </div>
    );
  }
}

export default USAPopulationDetail;
