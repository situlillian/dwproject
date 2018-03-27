import React, { Component } from "react";
import logo from "./logo.svg";
import PopulationDetail from "./PopulationDetail";
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
      country: "",
      text: ""
    };

    this.fetchCityLeader = this.fetchPopulations.bind(this);
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

          values ?hasPopulation { dbo:populationTotal dbp:populationCensus }
          OPTIONAL { ?x ?hasPopulation ?p }
          FILTER (isNumeric(?p))

          FILTER (langMatches(lang(?n), "en"))
          }
           `
        )
        .execute()
        // Get the item we want.
        .then(response => {
          console.log(response, Date.now());
          // Promise.resolve(response.results.bindings[0].value);
          this.setState({ countryPopulation: response.results.bindings[0].p.value });
          this.setState({ country: response.results.bindings[0].n.value });
        })
    );
  }

  componentDidMount() {
    this.fetchPopulations("Austria").then(response => console.log(`fetching`, Date.now()));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Population by Country</h1>
        </header>
        <p className="App-intro">To get started, click on a country to display population information.</p>
        <PopulationDetail population={this.state.countryPopulation} country={this.state.country} />
      </div>
    );
  }
}

export default App;
