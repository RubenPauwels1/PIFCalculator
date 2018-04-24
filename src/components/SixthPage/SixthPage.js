import React, { Component, Fragment } from 'react';
import Cleave from 'cleave.js/react';
import './SixthPage.css';

import Buttons from './../Buttons/Buttons';

class SixthPage extends Component {
  constructor(){
    super();

    this.state = {
      inputted: '',
    }
  }

  selectWage = (event) => {
        this.props.selectStartYear(event.target.rawValue)
  }

  render() {
    const { nextPage, prevPage, wage } = this.props

    return (
      <div className="SixthPage">
          <Fragment>
            <h2>Huidig bruto jaarloon</h2>
            <Fragment>
              <span className="eurosign">€</span>
              <Cleave
                 placeholder="0"
                 className="numberInput wage"
                 type="tel"
                 value={wage}
                 options={{
                  numeral: true,
                  numeralDecimalMark: ',',
                  delimiter: '.'
                 }}
               onChange={this.selectWage} />
            </Fragment>
            <div className="bereken_wrap">
              <a className="btn bereken" onClick={nextPage}>Bereken mijn pensioen</a>
            </div>
          </Fragment>
          <Buttons prevPage={prevPage} />
      </div>
    );
  }
}

export default SixthPage;
