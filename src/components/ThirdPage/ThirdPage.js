import React, { Component } from 'react';
import './ThirdPage.css';

import Buttons from './../Buttons/Buttons';

class ThirdPage extends Component {
  selectMaritalStatus = (event) => {
    this.props.selectMaritalStatus(event.target.value)
    this.props.nextPage()
  }

  render() {
    const { nextPage, prevPage, maritialstatus } = this.props
    return (
      <div className="ThirdPage">
          <div>
            <h1>Burgerlijke Staat</h1>
            <select onChange={this.selectMaritalStatus} value={maritialstatus} className="selectMaritalStatus">
              <option value="">Selecteer</option>
              <option value="Alleenstaand">Alleenstaand</option>
              <option value="Feitelijk samenwonend">Feitelijk samenwonend</option>
              <option value="Wettelijk samenwonend">Wettelijk samenwonend</option>
              <option value="Gehuwd">Gehuwd</option>
            </select>
          </div>
          <Buttons nextPage={nextPage} prevPage={prevPage}/>
      </div>
    );
  }
}

export default ThirdPage;
