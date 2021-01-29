import React, { Component } from "react";
const apiKey = "858828029fmsh37b23938027c823p15044ejsn9d489660ef51";

export default class RandomWord extends Component {
  state = {
    showGenre: true,
    genre: "",
    definition: "",
  };

  showGenre = () => {
    this.setState({ showGenre: true });
    fetch("https://random-word-api.herokuapp.com/word")
      .then((response) => response.json())
      .then((genre) => this.setState({ genre: genre }));
  };

  hideGenre = () => {
    this.setState({ showGenre: false });
  };

  defineWord = (event) => {
    let wordToSearch = event.target.innerText;
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${wordToSearch}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((wordData) => {
        this.setState({
          showWordData: true,
          wordData: {
            word: wordData.word,
            definitions: wordData.results[0].definition,
            synonyms: wordData.results[0].synonyms,
            syllables: wordData.syllables.count,
            frequencyScore: wordData.frequency,
            pronunciation: wordData.pronunciation.all,
          },
        });
      });
  };

  render() {
    return (
      <div>
        <button className="title" onClick={this.showGenre}>
          Random Word
        </button>
        {this.state.showGenre === false ? null : (
          <div>
            <p onClick={this.hideGenre} className="genre">
              {this.state.genre}
            </p>
          </div>
        )}
      </div>
    );
  }
}
