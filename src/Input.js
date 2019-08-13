import React from 'react';
import './App.css';


class Input extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="Input-div">
        <p>{this.props.title}</p>
        <input className="Input" type="text" onChange={this.props.onChange}/>
      </div>
    );
  }

}

export default Input;
