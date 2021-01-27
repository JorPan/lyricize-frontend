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
    let songLyrics = [];
    console.log(this.state.artistInput, this.state.songInput);
    this.state.lyrics.map((lyric) => songLyrics.push(lyric.props.children));
    console.log(songLyrics);
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
            <text className="lyrics">{this.state.lyrics}</text>
            <p></p>
            <button className="save-favorite-button" onClick={this.saveSong}>
              Save to My Favorites
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
