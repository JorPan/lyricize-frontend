import React, { Component } from "react";
const apiKey = "858828029fmsh37b23938027c823p15044ejsn9d489660ef51";
const initialState = {
  isShowing: false,
  rhymesWith: "",
  closeRhymes: "",
  similarTo: "",
  triggeredBy: "",
  startsWith: "",
  endsWith: "",
  soundsLike: "",
  speltLike: "",
  adjectives: "",
  nouns: "",
  relationSort: "",
  oftenFollows: "",
  oftenProceeds: "",
  syllableCount: "",
  words: [],
  wordData: {
    word: "",
    definitions: [],
    synonyms: "",
    syllables: "",
    derivation: "",
    similarTo: "",
    frequencyScore: "",
    pronunciation: "",
  },
  showWordData: false,
};

const clearState = {
  isShowing: true,
  rhymesWith: "",
  closeRhymes: "",
  similarTo: "",
  triggeredBy: "",
  startsWith: "",
  endsWith: "",
  soundsLike: "",
  speltLike: "",
  adjectives: "",
  nouns: "",
  relationSort: "",
  oftenFollows: "",
  oftenProceeds: "",
  syllableCount: "",
  words: [],
  wordData: {
    word: "",
    definitions: [],
    synonyms: "",
    syllables: "",
    derivation: "",
    similarTo: "",
    frequencyScore: "",
    pronunciation: "",
  },
  showWordData: false,
};

export default class MagicForm extends Component {
  state = initialState;

  showForm = () => {
    let showState = !this.state.isShowing;
    this.setState({ isShowing: showState });
  };

  searchForWords = (event) => {
    event.preventDefault();
    const {
      rhymesWith,
      closeRhymes,
      similarTo,
      triggeredBy,
      startsWith,
      endsWith,
      soundsLike,
      speltLike,
      adjectives,
      nouns,
      relationSort,
      oftenFollows,
      oftenProceeds,
      syllableCount,
    } = this.state;

    let queryString = ["https://api.datamuse.com/words?"];

    if (rhymesWith.length > 0) {
      queryString.push(`rel_rhy=${rhymesWith}&`);
    }

    if (closeRhymes.length > 0) {
      queryString.push(`rel_nry=${closeRhymes}&`);
    }

    if (similarTo.length > 0) {
      queryString.push(`ml=${similarTo}&`);
    }

    if (triggeredBy.length > 0) {
      queryString.push(`rel_trg=${triggeredBy}&`);
    }

    if (startsWith.length > 0) {
      queryString.push(`sp=${startsWith}*&`);
    }

    if (endsWith.length > 0) {
      queryString.push(`sp=*${endsWith}&`);
    }

    if (soundsLike.length > 0) {
      queryString.push(`sl=${soundsLike}&`);
    }

    if (speltLike.length > 0) {
      queryString.push(`sp=${speltLike}&`);
    }

    if (adjectives.length > 0) {
      queryString.push(`rel_jjb=${adjectives}&`);
    }

    if (nouns.length > 0) {
      queryString.push(`rel_jja=${nouns}&`);
    }

    if (relationSort.length > 0) {
      queryString.push(`topic=${relationSort}&`);
    }

    if (oftenFollows.length > 0) {
      queryString.push(`lc=${oftenFollows}&`);
    }

    if (oftenProceeds.length > 0) {
      queryString.push(`rc=${oftenProceeds}&`);
    }

    if (syllableCount > 0) {
      queryString.push(`mds=${syllableCount}&`);
    }

    fetch(queryString.join(""))
      .then((response) => response.json())
      .then((words) => this.setState({ words: words }))
      .catch((error) => {
        console.log("queryString error: ", error);
      });
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
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
        // console.log(wordData.synonyms);
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

  clearWord = () => {
    this.setState({ showWordData: false });
  };

  clearForm = () => {
    this.setState(clearState);
  };

  render() {
    const {
      rhymesWith,
      closeRhymes,
      similarTo,
      triggeredBy,
      startsWith,
      endsWith,
      soundsLike,
      speltLike,
      adjectives,
      nouns,
      relationSort,
      oftenFollows,
      oftenProceeds,
      syllableCount,
    } = this.state;
    return (
      <div className="form-card-container">
        {this.state.isShowing === false ? (
          <div className="need-a-hand">
            <h4 className="form-button" onClick={this.showForm}>
              Need a hand?
            </h4>
          </div>
        ) : (
          <div className="form-card">
            <div className="top-form">
              <h4 className="hide-button" onClick={this.showForm}>
                hide
              </h4>
            </div>
            <form className="inputForm" onSubmit={this.searchForWords}>
              <div className="inputs">
                <input
                  name="rhymesWith"
                  value={rhymesWith}
                  className="input"
                  type="text"
                  placeholder="Rhymes with..."
                  onChange={this.handleChange}
                />
                <input
                  name="closeRhymes"
                  value={closeRhymes}
                  className="input"
                  type="text"
                  placeholder="Near rhymes..."
                  onChange={this.handleChange}
                />
                <input
                  name="similarTo"
                  value={similarTo}
                  className="input"
                  type="text"
                  placeholder="Similar to..."
                  onChange={this.handleChange}
                />
                <input
                  name="triggeredBy"
                  value={triggeredBy}
                  className="input"
                  type="text"
                  placeholder="Triggered by..."
                  onChange={this.handleChange}
                />
                <input
                  name="startsWith"
                  value={startsWith}
                  className="input"
                  type="text"
                  placeholder="Starts with..."
                  onChange={this.handleChange}
                />
                <input
                  name="endsWith"
                  value={endsWith}
                  className="input"
                  type="text"
                  placeholder="Ends with..."
                  onChange={this.handleChange}
                />
                <input
                  name="soundsLike"
                  value={soundsLike}
                  className="input"
                  type="text"
                  placeholder="Sounds like..."
                  onChange={this.handleChange}
                />
                <input
                  name="speltLike"
                  value={speltLike}
                  className="input"
                  type="text"
                  placeholder="Spelt like..."
                  onChange={this.handleChange}
                />
                <input
                  name="adjectives"
                  value={adjectives}
                  className="input"
                  type="text"
                  placeholder="Adjectives! (input a noun)..."
                  onChange={this.handleChange}
                />
                <input
                  name="nouns"
                  value={nouns}
                  className="input"
                  type="text"
                  placeholder="Nouns! (input an adjective)..."
                  onChange={this.handleChange}
                />
                <input
                  name="oftenFollows"
                  value={oftenFollows}
                  className="input"
                  type="text"
                  placeholder="Often follows..."
                  onChange={this.handleChange}
                />
                <input
                  name="oftenProceeds"
                  value={oftenProceeds}
                  className="input"
                  type="text"
                  placeholder="Often preceeds..."
                  onChange={this.handleChange}
                />
                <input
                  name="relationSort"
                  value={relationSort}
                  className="input"
                  type="text"
                  placeholder="Sort by relation to..."
                  onChange={this.handleChange}
                />
                <input
                  name="syllableCount"
                  value={syllableCount}
                  className="input"
                  type="number"
                  placeholder="Syllable count..."
                  onChange={this.handleChange}
                />
                <input className="input" type="submit" value="Search" />
                <button onClick={this.clearForm}>Clear</button>
              </div>
              <div></div>
            </form>
            {this.state.showWordData === false ? null : (
              <section onClick={this.clearWord} className="word-data">
                <h3 className="word-section">{this.state.wordData.word}</h3>
                <h5 className="definition-section">
                  definition: {this.state.wordData.definitions}
                </h5>
                <section className="synonym-section">
                  <div>
                    <h5 className="synonym-title">synonyms:</h5>
                  </div>
                  <div className="synonyms">
                    {this.state.wordData.synonyms
                      ? this.state.wordData.synonyms.map((synonym) => (
                          <h5 className="synonym">{synonym}</h5>
                        ))
                      : null}
                  </div>
                </section>
                <h5 className="syllables-section">
                  syllables: {this.state.wordData.syllables}
                </h5>
                <h5 className="frequency-section">
                  frequency score: {this.state.wordData.frequencyScore}
                </h5>
                <h5 className="pronunciation-section">
                  pronunciation: {this.state.wordData.pronunciation}
                </h5>
              </section>
            )}

            <section className="suggestions">
              {this.state.words.map((word) => {
                return (
                  <p
                    onClick={this.defineWord}
                    className="suggested"
                    key={word.id}
                  >
                    {word.word}
                  </p>
                );
              })}
            </section>
          </div>
        )}
      </div>
    );
  }
}
