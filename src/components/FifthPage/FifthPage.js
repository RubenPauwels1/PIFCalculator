import React, { Component, Fragment } from 'react';
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
          <Fragment>
            <h2>Startjaar loopbaan</h2>
            <Cleave
               placeholder="0000"
               className="numberInput wage"
               type="tel"
               value={startYear}
               options={{
                blocks: [4],
                delimiter: '',
                numericOnly: true
               }}
             onChange={this.selectStartYear} />
          </Fragment>
          <Buttons nextPage={nextPage} prevPage={prevPage}/>
      </div>
    );

  }
}

export default FifthPage;
