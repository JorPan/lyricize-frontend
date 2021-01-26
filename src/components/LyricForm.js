import React, { Component } from "react";

export default class SongForm extends Component {
  addLine = () => {
    return <input type="text" />;
  };

  render() {
    return (
      <div>
        <button onClick={this.addLine}>+</button>
      </div>
    );
  }
}
