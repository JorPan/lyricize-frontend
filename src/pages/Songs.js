import React, { Component } from "react";
import "../styling/Songs.css";

export default class Songs extends Component {
  state = {
    artistInput: "",
    songInput: "",
    lyrics: "",
  };

  render() {
    return (
      <div className="song-search">
        <h1>artist</h1>
        <h1>song</h1>
      </div>
    );
  }
}
