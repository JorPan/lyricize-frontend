import React, { Component } from "react";

export default class BinaryJazz extends Component {
  state = {
    showGenre: true,
    genre: "",
  };

  componentDidMount() {}

  showGenre = () => {
    this.setState({ showGenre: true });
    fetch("https://binaryjazz.us/wp-json/genrenator/v1/genre/")
      .then((response) => response.json())
      .then((genre) => this.setState({ genre: genre }));
  };

  hideGenre = () => {
    this.setState({ showGenre: false });
  };

  render() {
    return (
      <div>
        <button className="title" onClick={this.showGenre}>
          Random Genre
        </button>
        {this.state.showGenre === false ? null : (
          <p onClick={this.hideGenre} className="genre">
            {this.state.genre}
          </p>
        )}
      </div>
    );
  }
}
