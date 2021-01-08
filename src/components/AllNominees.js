import React from "react";
import Star from "../assets/all-nominations.png";
import "./AllNominees.styles.css";

export default function AllNominees() {
  return (
    <div id="nominee-award">
      <img src={Star} alt="all nominations award" />
      <h3>All nominations are in!</h3>
    </div>
  );
}
