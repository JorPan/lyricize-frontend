import React, { Component } from "react";
import EditForm from "../components/EditForm";

import "../styling/Favorites.css";

export default class MySongs extends Component {
  state = {
    songs: [],
    song: {
      artist: "",
      title: "",
      lyrics: [],
    },
    edit: false,
    show: false,
  };

  componentDidMount() {
    fetch("http://localhost:3000/songs")
      .then((response) => response.json())
      .then((songs) => this.setState({ songs: songs }));
  }

  removeSong = (event) => {
    console.log("clicked delete");
    fetch(`http://localhost:3000/songs/${event.target.id}`, {
      method: "DELETE",
    }).then(() => {
      let filteredSongs = this.state.songs.filter(
        (song) => song.id !== event.target.id
      );
      this.setState({ songs: filteredSongs });
    });
  };

  renderSongs = () => {
    return this.state.songs.map((song) => {
      return (
        <div key={song.id}>
          <a
            onClick={this.showSong}
            className="song-link"
            key={`${song.id}+button`}
            id={song.id}
          >
            {song.artist} - {song.title}
          </a>
          <button
            onClick={this.removeSong}
            className="delete-button"
            id={song.id}
            key={`${song.id}-button`}
          >
            x
          </button>
        </div>
      );
    });
  };

  showSong = (event) => {
    this.setState({ show: true });
    fetch(`http://localhost:3000/songs/${event.target.id}`)
      .then((response) => response.json())
      .then((song) => {
        this.setState({
          song: {
            artist: song.artist,
            title: song.title,
            lyrics: song.lyrics,
          },
          songId: event.target.id,
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
      show: false,
      songId: 0,
    });
  };

  editSong = () => {
    this.setState({ edit: !this.state.edit, show: false });
  };

  hideEditForm = () => {
    this.setState({ edit: !this.state.edit, show: false });
  };

  saveEdits = () => {
    this.setState({ edit: false });
    window.location.replace("/lyrics");
  };

  render() {
    return (
      <div className="mysongsection">
        <div className="my-songs-section">
          <h2 className="title">My Written Songs</h2>
          {this.renderSongs()}
        </div>
        {this.state.show === false ? null : (
          <div>
            <h2 className="title">{this.state.song.artist}</h2>
            <h3 className="title">{this.state.song.title}</h3>
          </div>
        )}
        <div className="show-song">
          {this.state.show === false
            ? null
            : this.state.song.lyrics.map((row, i) => {
                return (
                  <div>
                    <p className="lyric-row" key={i} id={`lyric${row}`}>
                      {row}{" "}
                    </p>
                  </div>
                );
              })}
          {this.state.show === true ? (
            <div className="buttons">
              <button onClick={this.editSong} className="clear-button">
                Edit
              </button>
              <button onClick={this.clearSong} className="clear-button">
                Hide
              </button>
            </div>
          ) : null}
        </div>
        {this.state.edit === false ? null : (
          <div className="edit-form">
            <EditForm
              hideEditForm={this.hideEditForm}
              passedState={this.state}
              saveEdits={this.saveEdits}
            />
          </div>
        )}
      </div>
    );
  }
}
