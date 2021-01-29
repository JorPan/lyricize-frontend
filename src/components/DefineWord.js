import React, { Component } from "react";
const apiKey = "858828029fmsh37b23938027c823p15044ejsn9d489660ef51";

export default class DefineWord extends Component {
  state = {
    word: "",
    definition: "undefined",
  };

  search = (event) => {
    event.preventDefault();
    let wordToSearch = this.state.word;
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${wordToSearch}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((wordData) => {
        if (wordData.success === false) {
          this.setState({ definition: "Not Found" });
        } else if (wordData.results) {
          this.setState({ definition: wordData.results[0].definition });
        } else {
          this.setState({ definition: "Not Found" });
        }
      });
  };

  handleChange = (event) => {
    this.setState({ word: event.target.value });
  };

  hideDefinition = () => {
    this.setState({ definition: "undefined" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.search}>
          <input
            onChange={this.handleChange}
            value={this.state.word}
            name="input"
            type="text"
            placeholder="Word Lookup"
          ></input>
          <input type="submit"></input>
        </form>
        {this.state.definition === "undefined" ? null : (
          <p onClick={this.hideDefinition} className="definition">
            {this.state.definition}
          </p>
        )}
      </div>
    );
  }
}
