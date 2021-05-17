import React, { useState, useEffect, useCallback } from "react";
import EditForm from "../components/EditForm";
import "../styling/Favorites.css";

const songsURL = "http://localhost:3000/songs";

export default function MySongs() {
  const [songs, setSongs] = useState([]);
  const [songArtist, setSongArtist] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songLyrics, setSongLyrics] = useState([]);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [songId, setSongId] = useState(0);

  const fetchSongs = useCallback(() => {
    fetch(songsURL)
      .then((response) => response.json())
      .then((songs) => setSongs(songs));
  }, [setSongs]);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const removeSong = (event) => {
    fetch(`${songsURL}/${event.target.id}`, {
      method: "DELETE",
    }).then(() => {
      let filteredSongs = songs.filter((song) => song.id !== event.target.id);
      setSongs(filteredSongs);
    });
  };

  const showSong = (event) => {
    setShow(true);
    fetch(`${songsURL}/${event.target.id}`)
      .then((response) => response.json())
      .then((song) => {
        setSongArtist(song.artist);
        setSongTitle(song.title);
        setSongLyrics(song.lyrics);
        setSongId(event.target.id);
      });
  };

  const clearSong = () => {
    setSongId(0);
    setShow(false);
    setSongArtist("");
    setSongTitle("");
    setSongLyrics([]);
  };

  const editSong = () => {
    setEdit(!edit);
    setShow(false);
  };

  const hideEditForm = () => {
    setEdit(!edit);
    setShow(false);
  };

  const saveEdits = () => {
    setEdit(false);
    window.location.replace("/lyrics");
  };

  const renderSongs = () => {
    return songs.map((song) => {
      return (
        <div className="song-list" key={song.id}>
          <p
            onClick={showSong}
            className="song-link"
            key={`${song.id}+button`}
            id={song.id}
          >
            {song.artist} - {song.title}
          </p>
          <button
            onClick={removeSong}
            className="delete-button"
            id={song.id}
            key={`${song.id}-button`}
          >
            x
          </button>
        </div>
      );
    });
  };

  return (
    <div className="mysongsection">
      <div className="my-songs-section">
        <h2 className="title">My Written Songs</h2>
        {renderSongs()}
      </div>
      {show === false ? null : (
        <div>
          <h2 className="title">{songArtist}</h2>
          <h3 className="title">{songTitle}</h3>
        </div>
      )}
      <div className="show-song">
        {show === false
          ? null
          : songLyrics.map((row, i) => {
              return (
                <div>
                  <p className="lyric-row" key={i} id={`lyric${row}`}>
                    {row}{" "}
                  </p>
                </div>
              );
            })}
        {show === true ? (
          <div className="buttons">
            <button onClick={editSong} className="clear-button">
              Edit
            </button>
            <button onClick={clearSong} className="clear-button">
              Hide
            </button>
          </div>
        ) : null}
      </div>
      {edit === false ? null : (
        <div className="edit-form">
          <EditForm
            hideEditForm={hideEditForm}
            songId={songId}
            artistInput={songArtist}
            titleInput={songTitle}
            lyrics={songLyrics}
            saveEdits={saveEdits}
          />
        </div>
      )}
    </div>
  );
}
