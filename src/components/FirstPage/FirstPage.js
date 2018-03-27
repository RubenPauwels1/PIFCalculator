import React, { Component, Fragment } from 'react';
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
          <Fragment>
            <h2>Geslacht</h2>
            <div className="selectValues">
              <a className="selectValue men" data-value="Man" onClick={this.selectGender}>Man</a>
              <a className="selectValue women" data-value="Vrouw" onClick={this.selectGender}>Vrouw</a>
              {/*<a className="selectValue other" data-value="Anders" onClick={this.selectGender}>Anders</a>*/}
            </div>
          </Fragment>
          <Buttons nextPage={nextPage} />
      </div>
    );
  }
}

export default FirstPage;
