import React, { Component } from "react";

class QueryDetail extends Component {
  render() {
    return (
      <div className="detailBox">
        <h2>SPARQL Query</h2>
        <code>
          SELECT *<br />
          WHERE &#123; <br />
          ?x a dbo:Country.<br />
          ?x rdfs:label <span className="queryResultText">{this.props.country}</span>.<br />
          ?x rdfs:label ?n.<br />
          <br />
          values ?hasPopulation &#123;<br />
          dbo:populationTotal dbp:populationCensus }<br />
          OPTIONAL &#123; ?x ?hasPopulation ?p &#125;<br />
          <br />
          FILTER (isNumeric(?p))<br />
          FILTER (langMatches(lang(?n), "en"))<br />&#125;
        </code>
      </div>
    );
  }
}

export default QueryDetail;
