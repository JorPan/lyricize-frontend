import React, { Component } from "react";
import "../styling/Favorites.css";

const initialState = {
  favorites: [],
  song: {
    artist: "",
    title: "",
    lyrics: [],
  },
};

export default class Favorites extends Component {
  state = initialState;

  componentDidMount() {
    fetch("http://localhost:3000/favorites")
      .then((response) => response.json())
      .then((favorites) => this.setState({ favorites: favorites }));
  }

  showSong = (event) => {
    fetch(`http://localhost:3000/favorites/${event.target.id}`)
      .then((response) => response.json())
      .then((song) => {
        this.setState({
          song: {
            artist: song.artist,
            title: song.title,
            lyrics: song.lyrics,
          },
        });
      });
  };

  clearSong = () => {
    this.setState({
      song: {
        artist: "",
        title: "",
        lyrics: [],
      },
    });
  };

  removeSong = (event) => {
    fetch(`http://localhost:3000/favorites/${event.target.id}`, {
      method: "DELETE",
    })
      .then(() => {
        let filteredFavorites = this.state.favorites.filter(
          (favorite) => favorite.id !== event.target.id
        );
        this.setState({ favorites: filteredFavorites });
      })
      .then(window.location.reload());
  };

  render() {
    return (
      <div>
        <div className="favorites-page">
          <div className="favorites-section">
            <h2 className="title">My Favorited Songs</h2>
            {this.state.favorites.map((favorite) => {
              return (
                <div key={favorite.id}>
                  <a
                    onClick={this.showSong}
                    className="song-link"
                    key={`${favorite.id}+button`}
                    id={favorite.id}
                  >
                    {favorite.artist} - {favorite.title}
                  </a>
                  <button
                    onClick={this.removeSong}
                    className="delete-button"
                    id={favorite.id}
                    key={`${favorite.id}-button`}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="show-song">
          <h2 className="title">{this.state.song.artist}</h2>
          <h3 className="title">{this.state.song.title}</h3>
          {this.state.song.lyrics.map((row, i) => {
            return (
              <p className="lyric-row" key={i} id={`lyric${row}`}>
                {row}{" "}
              </p>
            );
          })}
          {this.state.song.lyrics.length > 0 ? (
            <button onClick={this.clearSong} className="clear-button">
              Hide
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}
