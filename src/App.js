import React, { Component } from "react";
import ReactDOM from "react-dom";
import { SparqlClient, SPARQL } from "sparql-client-2";
import NumericLabel from "react-pretty-numbers";
import "./App.css";
import PopulationDetail from "./components/PopulationDetail";
import USAPopulationDetail from "./components/USAPopulationDetail";
import WorldMapContainer from "./components/WorldMapContainer";
import USMapContainer from "./components/USMapContainer";
import QueryDetail from "./components/QueryDetail";

const client = new SparqlClient("http://dbpedia.org/sparql").register({
  db: "http://dbpedia.org/resource/",
  dbo: "http://dbpedia.org/ontology/",
  dbp: "http://dbpedia.org/property/"
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      country: {
        name: "",
        population: "",
        flag: ""
      }
    };

    this.fetchPopulations = this.fetchPopulations.bind(this);
    this.handleScrollToElement = this.handleScrollToElement.bind(this);
  }

  handleScrollToElement(event) {
    const detailNode = ReactDOM.findDOMNode(this.refs.details);
    window.scrollTo(0, detailNode.offsetTop);
  }

  fetchPopulations(countryName) {
    return (
      client
        .query(
          SPARQL`
          SELECT *
          WHERE {
          ?x a dbo:Country.
          ?x rdfs:label ${countryName}@en.
          ?x rdfs:label ?n.
          ?x dbo:thumbnail ?t.

          values ?hasPopulation { dbo:populationTotal dbp:populationCensus }
          OPTIONAL { ?x ?hasPopulation ?p }
          FILTER (isNumeric(?p))

          FILTER (langMatches(lang(?n), "en"))
          }
           `
        )
        // make sure we have population
        .execute()
        // get the item we want
        .then(response => {
          console.log(response, Date.now());
          let res = response.results.bindings[0];
          let newCountry = this.state.country;
          newCountry = {
            name: res.n.value,
            population: res.p.value,
            flag: res.t.value
          };
          this.setState({ country: newCountry });
        })
        .catch(err => {
          this.setState({ countryPopulation: `Unable to retrieve`, country: `${countryName}` });
        })
      // let the user know we could not find the population
    );
  }

  render() {
    let countryData = this.state.country;
    let populationTotal = countryData.population ? countryData.population : "0000000000";
    // no counry population data yet

    const option = {
      justification: "C",
      commafy: true
    };
    // prettify number

    return (
      <div className="App container">
        <header className="header">
          <h1 className="leftAlign">Population by Country</h1>
          <div>
            <p className="instructions">To get started, click on a country to display population information. </p>
            <button className="detailsScrollDown" onClick={this.handleScrollToElement}>
              See Details
            </button>
          </div>
          <div className="popTotalHeader">
            <NumericLabel params={option}>{populationTotal}</NumericLabel>
          </div>
        </header>
        <div className="main">
          <WorldMapContainer onCountryClick={this.fetchPopulations} country={countryData} />
        </div>
        <div ref="details" className="detail population">
          <PopulationDetail country={countryData} />
        </div>
        <div className="detail query">
          <QueryDetail country={countryData} />
        </div>
        <div className="footer">
          <p>Lillian Situ</p>
        </div>
      </div>
    );
  }
}

export default App;
