import React, { useEffect, useState, useCallback } from "react";
import "../styling/Favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [songArtist, setSongArtist] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songLyrics, setSongLyrics] = useState([]);

  const fetchFavorites = useCallback(() => {
    fetch("http://localhost:3000/favorites")
      .then((response) => response.json())
      .then((favorites) => setFavorites(favorites));
  });

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const removeSong = (event) => {
    fetch(`http://localhost:3000/favorites/${event.target.id}`, {
      method: "DELETE",
    }).then(() => {
      fetchFavorites();
    });
  };

  const showSong = (event) => {
    fetch(`http://localhost:3000/favorites/${event.target.id}`)
      .then((response) => response.json())
      .then((song) => {
        setSongArtist(song.artist);
        setSongTitle(song.title);
        setSongLyrics(song.lyrics);
      });
  };

  const clearSong = () => {
    setSongArtist("");
    setSongTitle("");
    setSongLyrics([]);
  };

  return (
    <div>
      <div className="favorites-page">
        <div className="favorites-section">
          <h2 className="title">My Favorited Songs</h2>
          {favorites.map((favorite) => {
            return (
              <div key={favorite.id}>
                <a
                  onClick={showSong}
                  className="song-link"
                  key={`${favorite.id}+button`}
                  id={favorite.id}
                >
                  {favorite.artist} - {favorite.title}
                </a>
                <button
                  onClick={removeSong}
                  className="delete-button"
                  id={favorite.id}
                  key={`${favorite.id}-button`}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="show-song">
        <h2 className="title">{songArtist}</h2>
        <h3 className="title">{songTitle}</h3>
        {songLyrics.map((row, i) => {
          return (
            <p className="lyric-row" key={i} id={`lyric${row}`}>
              {row}{" "}
            </p>
          );
        })}
        {songLyrics.length > 0 ? (
          <button onClick={clearSong} className="clear-button">
            Hide
          </button>
        ) : null}
      </div>
    </div>
  );
}
