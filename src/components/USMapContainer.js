import React, { Component } from "react";
import d3 from "d3";
import topojson from "topojson";
import Datamap from "datamaps";

class USMapContainer extends Component {
  constructor() {
    super();
    this.state = {};

    this.loadmap = this.loadmap.bind(this);
  }
  componentWillMount() {
    // load data
  }
  componentDidMount() {
    // render example D3
    this.loadmap();
  }

  loadmap() {
    const onCountryClick = this.props.onCountryClick;
    let clickedCountries = this.state.data;
    let datamapcontainer = new Datamap({
      element: document.getElementById("usamapcontainer"),
      scope: "usa",
      responsive: true,
      fills: {
        defaultFill: "#eceff1",
        clicked: "#F1E7B7"
      },
      data: { clickedCountries },
      done: function(datamap) {
        datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography) {
          let geo = geography.properties.name;
          console.log(geo);

          let id = geography.id; // update color when user clicks
          let data = {};
          data[id] = { fillKey: "clicked" };
          datamapcontainer.updateChoropleth(data);
        });
      },
      geographyConfig: {
        hideHawaiiAndAlaska: false,
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: "#607d8b",
        popupOnHover: true, // True to show the popup while hovering
        highlightOnHover: true,
        highlightFillColor: "#607d8b",
        highlightBorderColor: "#000000",
        highlightBorderWidth: 1,
        highlightBorderOpacity: 1
      }
    });
    datamapcontainer.labels();
  }

  render() {
    return <div id="usamapcontainer" />;
  }
}

export default USMapContainer;
