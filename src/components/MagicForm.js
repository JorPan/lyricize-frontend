import React, { Component } from "react";

export default class MagicForm extends Component {
  state = {
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
  };

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

    console.log(
      `https://api.datamuse.com/words?rel_rhy=${rhymesWith}&rel_nry=${closeRhymes}&ml=${similarTo}&rel_trg=${triggeredBy}&sp=${startsWith}*&sp=*${endsWith}&rel_hom=${soundsLike}&sp=${speltLike}&rel_jja=${nouns}&rel_jjb=${adjectives}&topics=${relationSort}&lc=${oftenFollows}&rc=${oftenProceeds}&mds=${syllableCount}`
    );

    // fetch(
    //   `https://api.datamuse.com/words?rel_rhy=${rhymesWith}&rel_nry=${closeRhymes}ml=${similarTo}&rel_trg=${triggeredBy}&sp=${startsWith}*&sp=*${endsWith}&rel_hom=${soundsLike}&sp=${speltLike}&rel_jja=${nouns}&rel_jjb=${adjectives}&topics=${relationSort}&lc=${oftenFollows}&rc=${oftenProceeds}`
    // )
    //   .then((response) => response.json())
    //   .then(console.log);
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    console.log(name, value);
    this.setState({ [name]: value });
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
      <div>
        {this.state.isShowing == false ? (
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
                  placeholder="Close rhymes..."
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
                  name="relationSort"
                  value={relationSort}
                  className="input"
                  type="text"
                  placeholder="Sort by relation to..."
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
                  name="syllableCount"
                  value={syllableCount}
                  className="input"
                  type="number"
                  placeholder="Syllable count..."
                  onChange={this.handleChange}
                />
                <input className="input" type="submit" value="Search" />
              </div>
              <div></div>
            </form>
          </div>
        )}
      </div>
    );
  }
}
