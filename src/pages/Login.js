import React, { Component } from "react";
import "../styling/Auth.css";

export default class Login extends Component {
  render() {
    return (
      <div>
        <h2 className="title">Login</h2>
        <div className="login">
          <form className="login-form">
            <input
              className="loginput"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="loginput"
              type="text"
              name="username"
              placeholder="Password"
            />
            <input
              className="loginput login-button"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
    );
  }
}
