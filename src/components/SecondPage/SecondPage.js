import React, { Component, Fragment } from 'react';
import Cleave from 'cleave.js/react';
import './SecondPage.css';

import Buttons from './../Buttons/Buttons';

class SecondPage extends Component {
  selectDay = (event) => {
    if(event.target.value.length >= 2 ){
        this.props.selectBirthDay(event.target.value)
        this.month.focus();
    } else if(event.target.value.length < 2){
        this.props.selectBirthDay(event.target.value)
    }
  }

  selectMonth = (event) => {
    if(event.target.value.length >= 2 ){
        this.props.selectBirthMonth(event.target.value)
        this.year.focus();
    } else if(event.target.value.length < 2) {
        this.props.selectBirthMonth(event.target.value)
    }
  }

  selectYear = (event) => {
    if(event.target.value.length >= 4 ){
        this.props.selectBirthYear(event.target.value)
        this.props.nextPage()
    } else if(event.target.value.length < 4) {
        this.props.selectBirthYear(event.target.value)
    }
  }

  render() {
    const { nextPage, prevPage, birthday, birthmonth, birthyear } = this.props
    return (
      <div className="SecondPage">
          <Fragment>
            <h2>Geboortedatum</h2>
            <Cleave
             htmlRef={(ref) => this.day = ref }
             placeholder="DD"
             className="numberInput day"
             type="tel"
             value={birthday}
             options={{
               date: true,
               datePattern: ['d']
             }}
             onChange={this.selectDay} />
            <span className="dateseparator">/</span>
            <Cleave
            htmlRef={(ref) => this.month = ref }
            placeholder="MM"
            className="numberInput month"
            type="tel"
            value={birthmonth}
            options={{
              date: true,
              datePattern: ['m']
            }}
            onChange={this.selectMonth} />
            <span className="dateseparator">/</span>
            <Cleave
            htmlRef={(ref) => this.year = ref }
            placeholder="JJJJ"
            className="numberInput year"
            type="tel"
            value={birthyear}
            options={{
              date: true,
              datePattern: ['Y']
            }}
            onChange={this.selectYear} />
          </Fragment>
          <Buttons nextPage={nextPage} prevPage={prevPage}/>
      </div>
    );
  }
}

export default SecondPage;
