import React from 'react';
import './App.css';


class Button extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="Button-div">
        <button className="Button" type="button" onClick={this.props.onClick}>
          {this.props.title}
        </button>
      </div>
    );
  }

}

export default Button;
