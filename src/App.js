import React, { Component } from "react";
import ReactDOM from "react-dom";
import { SparqlClient, SPARQL } from "sparql-client-2";
import NumericLabel from "react-pretty-numbers";
import WorldMapContainer from "./components/WorldMapContainer";
import PopulationDetail from "./components/PopulationDetail";
import QueryDetail from "./components/QueryDetail";
import Footer from "./components/Footer";
import Header from "./components/Header";

class App extends Component {
  constructor() {
    super();

    this.state = {
      country: {
        name: "",
        population: "",
        flag: ""
      },
      queryText: ""
    };

    this.fetchPopulations = this.fetchPopulations.bind(this);
    this.handleScrollToElement = this.handleScrollToElement.bind(this);
  }

  handleScrollToElement(event) {
    const detailNode = ReactDOM.findDOMNode(this.refs.details);
    window.scrollTo(20, detailNode.offsetTop);
  } // need to animate for smooth scrolling

  fetchPopulations(countryName) {
    const client = new SparqlClient("http://dbpedia.org/sparql").register({
      db: "http://dbpedia.org/resource/",
      dbo: "http://dbpedia.org/ontology/",
      dbp: "http://dbpedia.org/property/"
    });

    let query = SPARQL`
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
    }`;

    return (
      client
        .query(query)
        .execute()
        // get the item we want
        .then(response => {
          let res = response.results.bindings[0];
          let newCountry = this.state.country;
          newCountry = {
            name: res.n.value,
            population: res.p.value,
            flag: res.t.value
          };

          this.setState({ country: newCountry, queryText: query });
        })
        .catch(err => {
          let newCountry = this.state.country;
          newCountry = {
            name: countryName,
            population: "Unable to retrieve from DBPedia",
            flag: "Unable to retrieve from DBPedia"
          };
          this.setState({ country: newCountry });
        })
      // let the user know we could not find the population
    );
  }

  render() {
    let countryData = this.state.country;
    let queryText = this.state.queryText;
    // no counry population data yet

    return (
      <div className="App container-fluid">
        <Header handleScrollToElement={this.handleScrollToElement} />
        <div className="main">
          <p ref="details">To get started, click on a country to obtain population information.</p>
          <WorldMapContainer onCountryClick={this.fetchPopulations} country={countryData} />
        </div>
        <div className="row justify-content-center detail">
          <PopulationDetail country={countryData} />
          <QueryDetail queryText={queryText} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
