import React, { Component, Fragment } from 'react';
import './FourthPage.css';

import Buttons from './../Buttons/Buttons';

class FourthPage extends Component {
  selectJob = (event) => {
    this.props.selectJob(event.target.value)

    if(event.target.value !== 'Zelfstandige'){
      this.props.nextPage()
    }
  }

  selectSubJob = (event) => {
      this.props.selectSubJob(event.target.getAttribute('data-value'))
      this.props.nextPage()
  }

  clearSubJob = () => {
    this.props.selectSubJob('')
    this.props.selectJob('')
  }

  render() {
    const { nextPage, prevPage, job, subjob } = this.props

    return (
      <div className="FourthPage">
          <Fragment>

            {job !== 'Zelfstandige' && subjob === '' &&
            <Fragment>
              <h2>Beroep</h2>
              <select onChange={this.selectJob} value={job} className="selectJob">
                <option value="">Selecteer</option>
                <option value="Bediende">Bediende</option>
                <option value="Arbeider">Arbeider</option>
                <option value="Zelfstandige">Zelfstandige</option>
                <option value="Ambtenaar">Ambtenaar</option>
              </select>
            </Fragment>
            }

            {job === 'Zelfstandige' &&
            <Fragment>
              <h2>Zelfstandige in hoofd- of bijberoep?</h2>
              <div className="selectValues">
                <a className="btn back" onClick={this.clearSubJob}>Terug</a>
                <a className="btn selectValue" data-value="Zelfstandige_Hoofdberoep" onClick={this.selectSubJob}>Hoofdberoep</a>
                <a className="btn selectValue" data-value="Zelfstandige_Bijberoep" onClick={this.selectSubJob}>Bijberoep</a>
              </div>
            </Fragment>
            }

          </Fragment>
          <Buttons nextPage={nextPage} prevPage={prevPage}/>
      </div>
    );
  }
}

export default FourthPage;
