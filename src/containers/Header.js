import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link className="logo" to="/">
        Lyricize
      </Link>
      <div className="links">
        <div className="nav">
          <Link className="header-link" to="/songs">
            find lyrics
          </Link>
          <Link className="header-link" to="/lyrics">
            my lyrics
          </Link>
          <Link className="header-link" to="/write">
            write
          </Link>
        </div>
        <div className="auth">
          <Link className="header-link" to="/login">
            login
          </Link>
          <Link className="header-link" to="/signup">
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
