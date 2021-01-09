import React from "react";
import "./Search.styles.css";

export default function Search(props) {
  return (
    <div>
      <form id="search-bar-label">
        <label htmlFor="search">
          <input
            name="search"
            type="text"
            placeholder="Search.."
            onChange={props.searchFunction}
          />
          <br />
          Search for your favourite movies and add up to 5 to be selected for
          the nth annual Shoppies Award!
        </label>
      </form>
    </div>
  );
}
