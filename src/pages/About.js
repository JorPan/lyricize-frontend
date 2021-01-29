import React from "react";

export default function About() {
  return (
    <div>
      <h1 className="about-title">About Lyricize</h1>
      <h3 className="about-title">
        Lyricize is a platform to help songwriters write <u>better</u> lyrics.
      </h3>
      <h4 className="about-description">
        The key feature is the lyric-writing helper,
      </h4>
      <h4 className="about-description">That benefits users by offering</h4>
      <div className="about-items-section">
        <p className="about-item">direct rhymes.. </p>
        <p className="about-item">near rhymes.. </p>
        <p className="about-item">synonyms.. </p>
        <p className="about-item">related words.. </p>
        <p className="about-item">
          words that start or end with a specific letter..
        </p>
      </div>
      <h4 className="about-description">
        And other helpful insights as they write.
      </h4>
    </div>
  );
}
