import React, { Component } from 'react';
import './FirstPage.css';

import Buttons from './../Buttons/Buttons';

class FirstPage extends Component {
  selectGender = (event) => {
    this.props.selectGender(event.target.getAttribute('data-value'));
    this.props.nextPage();
  }

  render() {
    const { nextPage } = this.props
    return (
      <div className="FirstPage">
          <div>
            <h1>Geslacht</h1>
            <a className="selectValue" data-value="Man" onClick={this.selectGender}>Man</a>
            <a className="selectValue" data-value="Vrouw" onClick={this.selectGender}>Vrouw</a>
          </div>
          <Buttons nextPage={nextPage}/>
      </div>
    );
  }
}

export default FirstPage;
