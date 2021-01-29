import React, { Component } from "react";
import "../styling/Edit.css";
import MagicForm from "./MagicForm";

export default class SongForm extends Component {
  state = {
    numLines: 0,
    titleInput: "",
    artistInput: "",
    lyrics: [],
    saved: "",
    edit: false,
    songId: 0,
  };

  componentDidMount() {
    this.setState({
      numLines: this.props.passedState.song.lyrics.length,
      titleInput: this.props.passedState.song.title,
      artistInput: this.props.passedState.song.artist,
      lyrics: this.props.passedState.song.lyrics,
      songId: this.props.passedState.songId,
      edit: true,
    });
    this.props.passedState.song.lyrics.map((lyric, i) => {
      this.setState({ [`row${i + 1}`]: lyric });
    });
  }

  addLine = (event) => {
    event.preventDefault();
    this.setState({ numLines: this.state.numLines + 1 });
  };

  removeLine = (event) => {
    event.preventDefault();
    this.setState({ numLines: this.state.numLines - 1 });
  };

  clearRow = (event) => {
    event.preventDefault();
    let stateName = event.target.name;
    this.setState({
      [`${stateName}fallback`]: this.state[`${stateName}`],
      [stateName]: "",
    });
  };

  undoChange = (event) => {
    event.preventDefault();
    let stateName = event.target.name;
    this.setState({ [stateName]: this.state[`${stateName}fallback`] });
  };

  showLines = () => {
    let lines = [];
    for (let i = 0; i < this.state.numLines; i++) {
      lines.push(
        <div className="lyric-row">
          <p className="row-number">{i + 1}</p>
          <input
            key={`input${i}`}
            defaultValue={this.props.passedState.song.lyrics[i]}
            onChange={this.handleChange}
            name={[`row${i + 1}`]}
            className="lyric-row-input"
          />
          <button
            key={`clear${i}`}
            onClick={this.clearRow}
            name={`row${i}`}
            type="submit"
            className="clear-line-button"
          >
            x
          </button>
          <button
            key={`refresh${i}`}
            onClick={this.undoChange}
            name={`row${i}`}
            type="submit"
            className="clear-line-button"
          >
            ↺
          </button>
        </div>
      );
    }
    return lines;
  };

  showButtons = () => {
    return (
      <div>
        <div>
          <button className="add-row-button" onClick={this.addLine}>
            + line
          </button>
          <button className="add-row-button" onClick={this.removeLine}>
            - line
          </button>
        </div>
        <div>
          <input
            // onClick={this.props.hideEditForm}
            type="submit"
            className="save-button"
            value="Save"
          />
          <input
            onClick={this.props.hideEditForm}
            className="save-button"
            value="Hide"
          />
        </div>
      </div>
    );
  };

  showTitles = () => {
    return (
      <div className="lyric-form">
        <input
          onChange={this.handleChange}
          name="titleInput"
          className="song-title-input"
          defaultValue={this.state.titleInput}
        />
        <input
          onChange={this.handleChange}
          name="artistInput"
          className="artist-input"
          defaultValue={this.state.artistInput}
        />
      </div>
    );
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  saveLyrics = (event) => {
    event.preventDefault();
    let keyArray = Object.keys(this.state);
    let rowKeyArray = keyArray.filter((key) => key.includes("row"));
    let lyricArray = rowKeyArray.map((key) => this.state[key]);
    this.setState({ lyrics: lyricArray });
    let id = this.state.songId;
    this.setState({ lyrics: lyricArray });
    fetch(`http://localhost:3000/songs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artist: this.state.artistInput,
        title: this.state.titleInput,
        lyrics: lyricArray,
      }),
    })
      .then(this.setState({ saved: "Updated!", edit: false }))
      .then(setTimeout(() => this.props.saveEdits(), 1000));
  };

  render() {
    return (
      <div>
        {this.state.edit === true ? <MagicForm /> : null}

        <form onSubmit={this.saveLyrics} className="lyric-form">
          {this.state.edit === true ? this.showTitles() : null}
          {this.state.edit === true ? this.showLines() : null}
          {this.state.edit === true ? this.showButtons() : null}
        </form>
        {this.state.saved === "" ? null : <p>{this.state.saved}</p>}
      </div>
    );
  }
}
