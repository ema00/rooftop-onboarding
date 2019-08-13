/**
 * This program uses React to query the Unsplashed API to query for photographs data.
 * It is a simple example of the usage of async methods and API querying.
 * The most relevant files are:
 *    - UnsplashClientPublic.js'
 *    - App.js
 */

import React from 'react';
import './App.css';

import UnsplashClientPublic from './UnsplashClientPublic.js';
import Input from './Input.js';
import Button from './Button.js';
import SearchItem from './SearchItem.js'


const KEY = "1e5e4f5e62f1ed42a7c7fb07218b1f91e3f31279e37324727bc4da2712f7555f";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchResults: null,
    };
    this.client = new UnsplashClientPublic(KEY);
  }

  handleSearchTermChange = (event) => {
    const value = event.target.value;
    this.setState({query: value});
  }

  normalSearch = async () => {
    const data = await this.client.search(this.state.query, 1, 10);
    this.renderSearchResults(data.results);
  }

  randomSearch = async () => {
    const data = await this.client.getRandomImage(this.state.query, 10);
    this.renderSearchResults(data);
  }

  renderSearchResults = (items) => {
    const itemList = items.map(
      (item, index) =>
        <SearchItem key={item.id}
          description={item.alt_description}
          user={item.user.first_name + " " + item.user.last_name}
          full={item.urls.full}
        />
    );
    this.setState({searchResults: itemList});
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="Search-container">
          <Input title="Photo search term" onChange={this.handleSearchTermChange}/>
          <Button title="Normal search" onClick={this.normalSearch}/>
          <Button title="Random search" onClick={this.randomSearch}/>
        </div>
        <div className="Search-result-container"> {
            this.state.searchResults != null &&
              this.state.searchResults
          }
        </div>
      </div>
    );
  }

}

export default App;
