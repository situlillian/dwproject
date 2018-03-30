import React from "react";

const QueryDetail = ({ queryText }) => {
  return (
    <div className="detailBox col-md-4">
      <h2>SPARQL Query</h2>
      <code>{queryText}</code>
    </div>
  );
};

export default QueryDetail;
