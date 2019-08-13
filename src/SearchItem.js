import React from 'react';
import './App.css';


class SearchItem extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="Item-random-search-div">
        <div className="Image-container">
          <img src={ this.props.img }/>
        </div>
        <div className="Image-data-container">
          <p>Description: { this.props.description }</p>
          <p>User: { this.props.user }</p>
          <a href={ this.props.full }>Full size</a>
        </div>
      </div>
    );
  }

}

export default SearchItem;
