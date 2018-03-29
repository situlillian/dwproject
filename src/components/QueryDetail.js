import React, { Component } from "react";

class QueryDetail extends Component {
  render() {
    let query = this.props.country
      ? `
           SELECT * WHERE {
           ?x a dbo:Country.
           ?x rdfs:label ${this.props.country}.
           ?x rdfs:label ?n.

           values ?hasPopulation { dbo:populationTotal dbp:populationCensus }
           OPTIONAL { ?x ?hasPopulation ?p }
           FILTER (isNumeric(?p))

           FILTER (langMatches(lang(?n), "en"))
           }
            `
      : "";
    return (
      <div>
        <h3>SPARQL Query</h3>
        <code>{query}</code>
      </div>
    );
  }
}

export default QueryDetail;
