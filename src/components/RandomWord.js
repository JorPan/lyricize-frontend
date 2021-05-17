import React, { useState } from "react";

const randomWordURL = "https://random-word-api.herokuapp.com/word";

export default function RandomWord() {
  const [word, setWord] = useState("");
  const [showWord, setShowWord] = useState(true);

  const showThatWord = () => {
    setShowWord(true);
    fetch(randomWordURL)
      .then((response) => response.json())
      .then((word) => setWord(word));
  };

  const hideWord = () => {
    setShowWord(false);
  };

  return (
    <div>
      <button className="title" onClick={showThatWord}>
        Random Word
      </button>
      {showWord === false ? null : (
        <div>
          <p onClick={hideWord} className="genre">
            {word}
          </p>
        </div>
      )}
    </div>
  );
}
