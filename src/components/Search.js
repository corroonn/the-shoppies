import React from "react";
import "./Search.styles.css";

export default function Search(props) {
  return (
    <div>
      <div id="search-bar-label">
        <input
          name="search"
          type="text"
          placeholder="Search.."
          onChange={props.searchFunction}
        />
        <br />
        <label htmlFor="search">
          Search for your favourite movies and add up to 5 to be selected for
          the nth annual Shoppies Award!
        </label>
      </div>
    </div>
  );
}
