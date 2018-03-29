import React, { Component } from "react";

class PopulationDetail extends Component {
  render() {
    return (
      <div className="">
        <h3 className="">Current Country</h3>
        <p className="">Name: {this.props.country}</p>
        <p>Population: {this.props.population}</p>
      </div>
    );
  }
}

export default PopulationDetail;
