import React, { Component } from "react";

export default class SongForm extends Component {
  state = {
    numLines: 4,
    titleInput: "",
    artistInput: "",
    lyrics: [],
    saved: "",
  };

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
    for (let i = 1; i <= this.state.numLines; i++) {
      lines.push(
        <div className="lyric-row">
          <p className="row-number">{i}</p>
          <input
            key={`input${i}`}
            value={this.state[`row${i}`]}
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
    let keyArray = Object.keys(this.state);
    let rowKeyArray = keyArray.filter((key) => key.includes("row"));
    let lyricArray = rowKeyArray.map((key) => this.state[key]);
    this.setState({ lyrics: lyricArray });
    fetch("http://localhost:3000/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artist: this.state.artistInput,
        title: this.state.titleInput,
        lyrics: `${lyricArray}`,
      }),
    }).then(this.setState({ saved: "Saved to Your Songs!" }));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.saveLyrics} className="lyric-form">
          <input
            onChange={this.handleChange}
            name="titleInput"
            className="song-title-input"
            placeHolder="Song Title"
          />
          <input
            onChange={this.handleChange}
            name="artistInput"
            className="artist-input"
            placeHolder="Artist Name"
          />
          {this.showLines()}
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
