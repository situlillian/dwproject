import React, { Component } from "react";
import Datamap from "datamaps";

class WorldMapContainer extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };

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

    let datamapcontainer = new Datamap({
      element: document.getElementById("datamapcontainer"),
      scope: "world",
      responsive: true,
      fills: {
        defaultFill: "#eceff1",
        clicked: "#f2d653"
      },
      done: function(datamap) {
        datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography) {
          let country = geography.properties.name;
          if (country == "United States of America") {
            onCountryClick("United States"); // need to find a better solution; only edge case right now
          } else {
            onCountryClick(country); // pass to App to execute SPARQL
          }

          let id = geography.id; // update color when user clicks
          let data = {};
          data[id] = { fillKey: "clicked" };
          datamapcontainer.updateChoropleth(data);
        });
      },
      geographyConfig: {
        hideAntarctica: true,
        hideHawaiiAndAlaska: false,
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: "#607d8b",
        popupOnHover: true, // True to show the popup while hovering
        highlightOnHover: true,
        highlightFillColor: "#607d8b",
        highlightBorderColor: "#000000",
        highlightBorderWidth: 1,
        highlightBorderOpacity: 1,
        popupTemplate: function(geography, data) {
          return `<div class="hoverinfo"> ${geography.properties.name}`;
        }
      }
    });
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-10" id="datamapcontainer" />
      </div>
    );
  }
}

export default WorldMapContainer;
