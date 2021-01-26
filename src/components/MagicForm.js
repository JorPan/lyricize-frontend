import React, { Component } from "react";

export default class MagicForm extends Component {
  state = {
    isShowing: false,
  };

  showForm = () => {
    let showState = !this.state.isShowing;
    this.setState({ isShowing: showState });
  };

  render() {
    return (
      <div className="helper">
        {this.state.isShowing == false ? (
          <h4 className="form-button" onClick={this.showForm}>
            Need a hand?
          </h4>
        ) : (
          <div className="form-card">
            <div className="top-form">
              <h4 className="hide-button" onClick={this.showForm}>
                hide me
              </h4>
            </div>
          </div>
        )}
      </div>
    );
  }
}
