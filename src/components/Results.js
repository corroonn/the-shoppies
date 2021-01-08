import React from "react";
import AllNominees from "./AllNominees.js";

export default function Results(props) {
  let searchResults = <div>No results found for that search...</div>;
  if (props.data !== undefined) {
    searchResults = props.data.map((results) => (
      <li key={results.imdbID}>
        {results.Title} ({results.Year})
        <button
          onClick={props.nomFunction}
          title={results.Title}
          imdb={results.imdbID}
          poster={results.Poster}
          year={results.Year}
          disabled={props.dButton.some((el) => el === results.imdbID)}
        >
          Nominate
        </button>
      </li>
    ));
  }

  return (
    <div id="results-area" className="search-results">
      <h2>Movies:</h2>
      <div>
        {props.nominated.length >= 5 ? (
          <AllNominees />
        ) : (
          <ul>{searchResults}</ul>
        )}
      </div>
      <br />
    </div>
  );
}
