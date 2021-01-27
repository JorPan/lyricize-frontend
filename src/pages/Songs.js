import React, { Component } from "react";
import "../styling/Songs.css";

export default class Songs extends Component {
  state = {
    artistInput: "",
    songInput: "",
    lyrics: "",
  };

  handleArtistChange = (event) => {
    this.setState({ artistInput: event.target.value });
  };

  handleSongChange = (event) => {
    this.setState({ songInput: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let artist = this.state.artistInput;
    let song = this.state.songInput.split(" ").join("+");
    console.log(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then((response) => response.json())
      .then((lyrics) => this.setState({ lyrics: lyrics.lyrics }));
  };

  render() {
    return (
      <div className="song-page">
        <form onSubmit={this.handleSubmit} className="song-search">
          <div>
            <label>Search for Song Lyrics</label>
          </div>
          <div>
            <input
              onChange={this.handleArtistChange}
              type="text"
              name="artist"
              placeholder="artist"
              value={this.state.artistInput}
            />
            <input
              onChange={this.handleSongChange}
              type="text"
              name="song"
              placeholder="song"
              value={this.state.songInput}
            />
            <input type="submit" />
          </div>
        </form>
        {this.state.lyrics !== "" ? (
          <div className="results">
            <p className="lyrics">{this.state.lyrics}</p>
          </div>
        ) : null}
      </div>
    );
  }
}
