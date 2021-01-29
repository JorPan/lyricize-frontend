import React, { Component } from "react";
import "../styling/Edit.css";

export default class SongForm extends Component {
  state = {
    songId: 0,
    numLines: 4,
    titleInput: "",
    artistInput: "",
    lyrics: [],
    saved: "",
  };

  componentDidMount() {
    this.setState({
      numLines: this.props.passedState.song.lyrics.length,
      titleInput: this.props.passedState.song.title,
      artistInput: this.props.passedState.song.artist,
      lyrics: this.props.passedState.song.lyrics,
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  clearRow = (event) => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: "" });
  };

  undoChange = (event, prevState) => {
    console.log(prevState);
  };

  showLines = () => {
    let lines = [];
    for (let i = 0; i < this.props.passedState.song.lyrics.length; i++) {
      lines.push(
        <div className="lyric-row">
          <p className="row-number">{i + 1}</p>
          <input
            key={`input${i}`}
            value={this.props.passedState.song.lyrics[i]}
            onChange={this.handleChange}
            name={`row${i}`}
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
            onClick={(prevState) => this.undoChange}
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

  saveLyrics = (event) => {
    event.preventDefault();
    console.log(event);
    // let keyArray = Object.keys(this.state);
    // let rowKeyArray = keyArray.filter((key) => key.includes("row"));
    // let lyricArray = rowKeyArray.map((key) => this.state[key]);
    // this.setState({ lyrics: lyricArray });
    // fetch("http://localhost:3000/songs", {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     artist: this.state.artistInput,
    //     title: this.state.titleInput,
    //     lyrics: lyricArray,
    //   }),
    // }).then(this.setState({ saved: "Saved to Your Songs!" }));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.saveLyrics} className="lyric-form">
          <input
            onChange={this.handleChange}
            name="titleInput"
            className="song-title-input"
            value={this.state.titleInput}
          />
          <input
            onChange={this.handleChange}
            name="artistInput"
            className="artist-input"
            value={this.state.artistInput}
          />
          {this.props.passedState.edit === true ? this.showLines() : null}
          <div>
            <button className="add-row-button" onClick={this.addLine}>
              + line
            </button>
            <button className="add-row-button" onClick={this.removeLine}>
              - line
            </button>
          </div>
          <div>
            <input type="submit" className="save-button" value="Save" />
          </div>
        </form>
        {this.state.saved === "" ? null : <p>{this.state.saved}</p>}
      </div>
    );
  }
}
