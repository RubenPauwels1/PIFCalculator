import React, { Component } from 'react';
import './FinalPage.css';

class FinalPage extends Component {
  calcPensionWage = (startYear, wage, maritialStatus) => {
    const radix = 10

    //YEARS WORKED
    const currentYear = parseInt((new Date()).getFullYear(), radix)
    startYear = parseInt(startYear, radix);
    const numberOfWorkedYears = currentYear - startYear;
    let numberOfWorkedYearsCalced = 0;

    if(numberOfWorkedYears > 45){
      numberOfWorkedYearsCalced = 45;
    } else {
      numberOfWorkedYearsCalced = numberOfWorkedYears;
    }

    //BRUTTO-WAGE
    wage = parseInt(wage, radix);

    //MARITIAL STATUS
    let maritialstatusperc = 0;

    if(maritialStatus === "Alleenstaand"){
      maritialstatusperc = 0.6;
    } else {
      maritialstatusperc = 0.75;
    }

    //PENSION BRUTTO WAGE
    let pensionWage = (numberOfWorkedYearsCalced / 45) * wage * maritialstatusperc;
    return pensionWage.toLocaleString('nl-BE');
  };

  render() {
    const { fields, resetAll } = this.props


    // PENSION-AGE
    const pensionAge = 65; /* TODO: CALCULATE! */

    const pensionWage = this.calcPensionWage(fields.startYear, fields.wage, fields.maritialstatus)



    return (
      <div className="FinalPage">
          <div>
            <h1>Jouw Pensioen</h1>
            <div>
              <p>U zal op pensioen kunnen gaan op</p>
              <p className="pensionAge">{pensionAge} Jaar</p>
              <p>en een wettelijk pensioen ontvangen van ongeveer:</p>
              <p className="pensionWage">€ {pensionWage}</p>
            </div>
            <div className="reset_wrap">
              <a className="reset" onClick={resetAll}>Herbeginnen</a>
            </div>
          </div>
      </div>
    );
  }
}

export default FinalPage;
