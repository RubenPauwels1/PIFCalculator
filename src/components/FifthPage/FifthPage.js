import React, { Component } from 'react';
import Cleave from 'cleave.js/react';
import './FifthPage.css';

import Buttons from './../Buttons/Buttons';

class FifthPage extends Component {
  selectStartYear = (event) => {
    if(event.target.value.length >= 4 ){
        this.props.selectStartYear(event.target.value)
        this.props.nextPage()
    } else if(event.target.value.length < 4) {
        this.props.selectStartYear(event.target.value)
    }
  }

  render() {
    const { nextPage, prevPage, startYear } = this.props

    return (
      <div className="FifthPage">
          <div>
            <h1>Startjaar Loopbaan</h1>
            <Cleave
               placeholder="0000"
               className="numberInput wage"
               value={startYear}
               options={{
                blocks: [4],
                delimiter: '',
                numericOnly: true
               }}
             onChange={this.selectStartYear} />
          </div>
          <Buttons nextPage={nextPage} prevPage={prevPage}/>
      </div>
    );

  }
}

export default FifthPage;
