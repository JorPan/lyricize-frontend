import React, { Component } from "react";
import "../styling/Songs.css";

const initialState = {
  artistInput: "",
  songInput: "",
  lyrics: "",
  saved: "",
};

export default class Songs extends Component {
  state = initialState;

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let artist = this.state.artistInput;
    let song = this.state.songInput.split(" ").join("+");
    fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then((response) => response.json())
      .then((lyrics) => {
        let parsedLyrics = lyrics.lyrics.split("\n").map((i) => {
          return (
            <p className="lyric-row" key={i.id}>
              {i}
            </p>
          );
        });
        this.setState({ lyrics: parsedLyrics });
      });
  };

  saveSong = () => {
    let songLyrics = this.state.lyrics.map((lyric) => lyric.props.children);
    fetch("http://localhost:3000/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorite: {
          artist: this.state.artistInput,
          title: this.state.songInput,
          lyrics: songLyrics,
        },
      }),
    }).then(this.setState({ saved: "Saved to Your Favorites!" }));
  };

  clearScreen = () => {
    this.setState(initialState);
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
              onChange={this.handleChange}
              type="text"
              name="artistInput"
              placeholder="artist"
              value={this.state.artistInput}
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="songInput"
              placeholder="song"
              value={this.state.songInput}
            />
            <input type="submit" />
          </div>
        </form>
        {this.state.lyrics.length > 1 ? (
          <div className="results">
            <text className="lyrics">{this.state.lyrics}</text>
            <button className="save-favorite-button" onClick={this.saveSong}>
              Save to My Favorites
            </button>
            <button className="clear-button" onClick={this.clearScreen}>
              Clear Screen
            </button>
          </div>
        ) : (
          <h6 className="no-results">No Results</h6>
        )}
        <p className="saved">{this.state.saved}</p>
      </div>
    );
  }
}
