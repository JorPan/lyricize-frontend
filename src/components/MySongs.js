import React, { Component } from "react";

export default class MySongs extends Component {
  state = {};

  componentDidMount() {
    fetch("http://localhost:3000/songs")
      .then((response) => response.json())
      .then(console.log);
  }
  render() {
    return <div></div>;
  }
}
