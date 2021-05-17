import React from "react";
import Favorites from "../components/Favorites";
import MySongs from "../components/MySongs";

export default function Lyrics() {
  return (
    <div className="my-songs-page">
      <div className="songsection">
        <Favorites />
        <MySongs />
      </div>
    </div>
  );
}
