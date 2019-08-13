import React from 'react';
import './App.css';

import UnsplashClientPublic from './UnsplashClientPublic.js';
import Input from './Input.js';
import Button from './Button.js';


const KEY = "1e5e4f5e62f1ed42a7c7fb07218b1f91e3f31279e37324727bc4da2712f7555f";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.client = new UnsplashClientPublic(KEY);
  }

  handleSearchTermChange = (event) => {
    const value = event.target.value;
    this.setState({query: value});
  }

  normalSearch = async () => {
    // TODO: RENDER RESULT OF NORMAL SEARCH
    console.log("NORMAL SEARCH:");
    const data = await this.client.search(this.state.query, 1, 10);
    console.log(data);
  }

  randomSearch = async () => {
    // TODO: RENDER RESULT OF RANDOM SEARCH
    console.log("RANDOM SEARCH:");
    const data = await this.client.getRandomImage(this.state.query, 10);
    console.log(data);
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
      </div>
    );
  }

}

export default App;
