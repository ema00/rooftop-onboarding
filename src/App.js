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

  componentDidMount = () => {
    this.logRequests();
  }

  // this is just to test the UnsplashClientPublic class
  // TODO: REMOVE THIS ONCE EVERYTHING IS WORKING
  logRequests = async () => {
    const data1 = await this.client.search("dog", 1, 10);
    const data2 = await this.client.getRandomImage("dog", 10);
    console.log(data1);
    console.log(data2);
  }

  handleSearchTermChange = (event) => {
    const value = event.target.value;
    this.setState({query: value});
  }

  normalSearch = () => {
    // TODO: IMPLEMENT NORMAL SEARCH
    console.log("NORMAL SEARCH: " + this.state.query);
  }

  randomSearch = () => {
    // TODO: IMPLEMENT RANDOM SEARCH
    console.log("RANDOM SEARCH: " + this.state.query);
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
