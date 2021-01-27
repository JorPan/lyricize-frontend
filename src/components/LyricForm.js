import React, { Component } from "react";

export default class SongForm extends Component {
  addLine = () => {
    return <input type="text" name="" placeholder="new line" />;
  };

  render() {
    return (
      <div className="lyric-form">
        <input className="song-title-input" placeHolder="Song Title" />
        <div className="lyric-row">
          <input className="lyric-row-input" />
          <button className="clear-line-button">x</button>
        </div>
        <div className="lyric-row">
          <input className="lyric-row-input" />
          <button className="clear-line-button">x</button>
        </div>
        <div className="lyric-row">
          <input className="lyric-row-input" />
          <button className="clear-line-button">x</button>
        </div>
        <div className="lyric-row">
          <input className="lyric-row-input" />
          <button className="clear-line-button">x</button>
        </div>

        <p className="break-row" />
        <div className="lyric-row">
          <input className="lyric-row-input" />
          <button className="clear-line-button">x</button>
        </div>
        <div className="lyric-row">
          <input className="lyric-row-input" />
          <button className="clear-line-button">x</button>
        </div>
        <div className="lyric-row">
          <input className="lyric-row-input" />
          <button className="clear-line-button">x</button>
        </div>
        <div className="lyric-row">
          <input className="lyric-row-input" />
          <button className="clear-line-button">x</button>
        </div>
        <div>
          <button className="add-row-button" onClick={this.addLine}>
            + line
          </button>
          <button className="add-row-button" onClick={this.addLine}>
            + break
          </button>
        </div>
      </div>
    );
  }
}
