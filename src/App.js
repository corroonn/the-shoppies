import React from "react";
import Results from "./components/Results.js";
import Search from "./components/Search.js";
import Nominations from "./components/Nominations.js";
import { ReactComponent as ShoppiesLogo } from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      movies: [],
      searchKey: "",
      disabledButtons: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.nominateMovie = this.nominateMovie.bind(this);
    this.removeNominated = this.removeNominated.bind(this);
  }

  componentDidMount() {
    var movieSelection = JSON.parse(localStorage.getItem("selected"));
    var whichButtons = JSON.parse(localStorage.getItem("disabledButtons"));
    if (movieSelection !== null && whichButtons !== null) {
      this.setState({
        selected: movieSelection,
        disabledButtons: whichButtons,
      });
    }

    fetch(
      "https://www.omdbapi.com/?s=%22die-hard%22&type=movie&r=json&apikey=c7648ad1"
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          movies: data.Search,
        })
      );
  }

  handleChange(event) {
    const searchText = event.target.value;
    this.setState({
      searchKey: searchText,
    });

    fetch(
      "https://www.omdbapi.com/?s=%22" +
        searchText +
        "%22&type=movie&r=json&apikey=c7648ad1"
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          movies: data.Search,
        })
      );
  }

  nominateMovie(event) {
    const nomTitle = event.target.title;
    const nomPoster = event.target.getAttribute("poster");
    const nomImdb = event.target.getAttribute("imdb");
    const nomYear = event.target.getAttribute("year");

    if (this.state.selected.length <= 4) {
      this.setState({
        selected: [
          ...this.state.selected,
          {
            id: nomImdb,
            name: nomTitle,
            year: nomYear,
            poster: nomPoster,
          },
        ],
        disabledButtons: [...this.state.disabledButtons, nomImdb],
      });
    }
  }

  removeNominated(event) {
    let imdbID = event.target.getAttribute("imdb");
    let newState = this.state.selected.filter((x) => {
      return x.id !== imdbID;
    });

    let newDisabledButtons = this.state.disabledButtons.filter(
      (ele) => ele !== imdbID
    );

    this.setState({
      selected: newState,
      disabledButtons: newDisabledButtons,
    });
  }

  componentDidUpdate() {
    localStorage.setItem("selected", JSON.stringify(this.state.selected));
    localStorage.setItem(
      "disabledButtons",
      JSON.stringify(this.state.disabledButtons)
    );
  }

  render() {
    return (
      <div id="app-body">
        <header>
          <ShoppiesLogo className="shoppies-logo" alt="shoppies logo" />
          <p id="tagline">
            by{" "}
            <a href="https://www.linkedin.com/in/nick-corroon-88741948/">
              Nick Corroon
            </a>
          </p>
          <div id="header-search">
            <h1>A movie award for entrepreneurs</h1>
            <Search searchFunction={this.handleChange} />
          </div>
        </header>

        <main>
          <div id="movies-flex">
            <Results
              data={this.state.movies}
              nominated={this.state.selected}
              dButton={this.state.disabledButtons}
              nomFunction={this.nominateMovie}
            />
            <Nominations
              data={this.state.selected}
              nomRemove={this.removeNominated}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
