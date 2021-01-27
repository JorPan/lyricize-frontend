import React, { Component } from "react";

export default class SongForm extends Component {
  addLine = () => {
    return <input type="text" name="" placeholder="new line" />;
  };

  render() {
    return (
      <div className="lyric-form">
        <input className="lyric-row" />
        <button className="add-row-button" onClick={this.addLine}>
          +
        </button>
      </div>
    );
  }
}
