import React, { Component } from 'react';
import './FourthPage.css';

import Buttons from './../Buttons/Buttons';

class FourthPage extends Component {
  selectJob = (event) => {
    this.props.selectJob(event.target.value)
    this.props.nextPage()
  }

  render() {
    const { nextPage, prevPage, job } = this.props

    return (
      <div className="FourthPage">
          <div>
            <h1>Beroep</h1>
            <select onChange={this.selectJob} value={job} className="selectJob">
              <option value="">Selecteer</option>
              <option value="Bediende">Bediende</option>
              <option value="Arbeider">Arbeider</option>
              <option value="Zelfstandige">Zelfstandige</option>
              <option value="Ambtenaar">Ambtenaar</option>
            </select>
          </div>
          <Buttons nextPage={nextPage} prevPage={prevPage}/>
      </div>
    );
  }
}

export default FourthPage;
