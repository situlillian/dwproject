import React, { Component } from "react";
import PopulationDetail from "./components/PopulationDetail";
import USAPopulationDetail from "./components/USAPopulationDetail";
import WorldMapContainer from "./components/WorldMapContainer";
import USMapContainer from "./components/USMapContainer";
import QueryDetail from "./components/QueryDetail";
import "./App.css";
import { SparqlClient, SPARQL } from "sparql-client-2";

const client = new SparqlClient("http://dbpedia.org/sparql").register({
  db: "http://dbpedia.org/resource/",
  dbo: "http://dbpedia.org/ontology/",
  dbp: "http://dbpedia.org/property/"
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      countryPopulation: "",
      country: ""
    };

    this.fetchPopulations = this.fetchPopulations.bind(this);
  }

  fetchPopulations(countryName) {
    console.log(countryName);
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
        // Get the item we want.
        .then(response => {
          console.log(response, Date.now());
          let res = response.results.bindings[0];
          this.setState({ countryPopulation: res.p.value, country: res.n.value });
          this.setState({ text: this.state.country ? this.state.query : "" });
        })
        .catch(err => {
          this.setState({ countryPopulation: `Unable to retrieve`, country: `Unable to retreive` });
        })
      // let the user know we could not find the population
    );
  }

  componentDidMount() {}

  render() {
    return (
      <div className="App container">
        <header className="header">
          <h1 className="leftAlign">Population by Country</h1>
          <p className="">To get started, click on a country to display population information.</p>
        </header>
        <div className="main">
          <WorldMapContainer onCountryClick={this.fetchPopulations} />
        </div>
        <div className="detail population">
          <PopulationDetail population={this.state.countryPopulation} country={this.state.country} />
        </div>
        <div className="detail query">
          <QueryDetail country={this.state.country} />
        </div>
        <div className="usaMap">
          <USMapContainer />
          <p className="">To get started, click on a state to display more information.</p>
          <h1 className="rightAlign">Population by State</h1>
        </div>
        <div className="detail query2">
          <QueryDetail />
        </div>
        <div className="detail population2">
          <USAPopulationDetail />
        </div>
        <div className="footer">
          <p>Lillian Situ</p>
        </div>
      </div>
    );
  }
}

export default App;
