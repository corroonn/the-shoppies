import React from "react";
import Poster from "../assets/shoppies-poster.png";
import "./Nominations.styles.css";

export default function Nominations(props) {
  const nominees = props.data.map((noms) => (
    <li key={noms.id}>
      {noms.name} ({noms.year})
      <button
        onClick={props.nomRemove}
        title={noms.name}
        imdb={noms.id}
        poster={noms.poster}
        year={noms.year}
      >
        Remove
      </button>
    </li>
  ));

  const searchResultsPosters = props.data.map((results) => (
    <li>
      <img
        key={results.id}
        src={results.poster === "N/A" ? Poster : results.poster}
        alt={results.name}
      />
    </li>
  ));

  return (
    <div id="results-area">
      <h2>Nominees:</h2>
      <ul id="movie-posters">{searchResultsPosters}</ul>
      <ul>{nominees}</ul>
    </div>
  );
}
