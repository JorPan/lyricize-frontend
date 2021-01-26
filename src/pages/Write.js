import React, { Component } from "react";
import "../styling/Write.css";
import MagicForm from "../components/MagicForm";
import LyricForm from "../components/LyricForm";

export default class Write extends Component {
  render() {
    return (
      <div>
        <h1 className="write-head">Let's Write a Song</h1>
        <MagicForm />
        <LyricForm />
      </div>
    );
  }
}
