import React, { useState, useEffect } from "react";
import { defineWordKey } from "../config";
const apiKey = defineWordKey;
const definitionURL = "https://wordsapiv1.p.rapidapi.com/words";

export default function DefineWord() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("undefined");

  const search = (event) => {
    event.preventDefault();
    let wordToSearch = word;
    fetch(`${definitionURL}/${wordToSearch}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((wordData) => {
        if (wordData.success === false) {
          setDefinition("Not Found");
        } else if (wordData.results) {
          setDefinition(wordData.results[0].definition);
        } else {
          setDefinition("Not Found");
        }
      });
  };

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const hideDefinition = () => {
    setDefinition("undefined");
  };

  return (
    <div>
      <form onSubmit={search}>
        <input
          onChange={handleChange}
          value={word}
          name="input"
          type="text"
          placeholder="Word Lookup"
        ></input>
        <input type="submit"></input>
      </form>
      {definition === "undefined" ? null : (
        <p onClick={hideDefinition} className="definition">
          {definition}
        </p>
      )}
    </div>
  );
}
