import React from 'react';
import './App.css';


class SearchItem extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="Item-random-search-div">
        <p>Description: { this.props.description }</p>
        <p>User: { this.props.user }</p>
        <a href={ this.props.full }>Image link</a>
      </div>
    );
  }

}

export default SearchItem;
