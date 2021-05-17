import React, { useState } from "react";

const genreURL = "https://binaryjazz.us/wp-json/genrenator/v1/genre/";

export default function BinaryJazz() {
  const [genre, setGenre] = useState("");
  const [showGenre, setShowGenre] = useState(true);

  const showThatGenre = () => {
    setShowGenre(true);
    fetch(genreURL)
      .then((response) => response.json())
      .then((genre) => setGenre(genre));
  };

  const hideGenre = () => {
    setShowGenre(false);
  };

  return (
    <div>
      <button className="title" onClick={showThatGenre}>
        Random Genre
      </button>
      {showGenre === false ? null : (
        <p onClick={hideGenre} className="genre">
          {genre}
        </p>
      )}
    </div>
  );
}
