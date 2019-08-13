import React from 'react';
import './App.css';

import UnsplashClientPublic from './UnsplashClientPublic.js';


const KEY = "1e5e4f5e62f1ed42a7c7fb07218b1f91e3f31279e37324727bc4da2712f7555f";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.client = new UnsplashClientPublic(KEY);
  }

  componentDidMount = () => {
    this.logRequests();
  }

  // this is just to test the UnsplashClientPublic class
  logRequests = async () => {
    const data1 = await this.client.search("dog", 1, 10);
    const data2 = await this.client.getRandomImage("dog", 10);
    console.log(data1);
    console.log(data2);
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
        </header>
      </div>
    );
  }

}

export default App;
