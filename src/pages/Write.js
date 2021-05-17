import React from "react";
import "../styling/Write.css";
import MagicForm from "../components/MagicForm";
import LyricForm from "../components/LyricForm";

export default function Write() {
  return (
    <div>
      <h1 className="write-head">Let's Write a Song</h1>
      <div className="lyric-form-section">
        <MagicForm />
        <LyricForm />
      </div>
    </div>
  );
}
