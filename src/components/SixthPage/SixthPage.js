import React, { Component } from 'react';
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
          <div>
            <h1>Brutto Jaarloon</h1>
            <div>
              <span className="eurosign">€</span>
              <Cleave
                 placeholder="0"
                 className="numberInput wage"
                 value={wage}
                 options={{
                  numeral: true,
                  numeralDecimalMark: ',',
                  delimiter: '.'
                 }}
               onChange={this.selectWage} />
            </div>
            <div className="bereken_wrap">
              <a className="bereken" onClick={nextPage}>Bereken mijn pensioen</a>
            </div>
          </div>
          <Buttons prevPage={prevPage} />
      </div>
    );
  }
}

export default SixthPage;
