import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import YouTubePlayer from 'react-player/lib/players/YouTube'
import WPAPI from 'wpapi'
// import axios from 'axios'

import './FinalPage.css'

class FinalPage extends Component {

  constructor(){
    super();

    this.state = {
      radix: 10,
      currentYear: parseInt((new Date()).getFullYear(), 10),
      firsname: '',
      lastname: '',
      tel: '',
      email: '',
      sent: false,
    }
  }

  calcMaritialStatusPerc = (maritialStatus) => {
    if(maritialStatus === "Alleenstaand" || maritialStatus === "Feitelijk samenwonend"){
      return 0.6;
    } else {
      return 0.75;
    }
  }

  calcPensionWageNowPerYear = (startYear, wage, maritialStatus) => {
    const { radix, currentYear} = this.state;

    //YEARS WORKED
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
    let maritialstatusperc = this.calcMaritialStatusPerc(maritialStatus);

    //PENSION BRUTTO WAGE
    console.log('# of worked years: ' + numberOfWorkedYearsCalced + ' | wage: ' + wage + ' | Maritial status %: ' + maritialstatusperc);
    let pensionWage = (numberOfWorkedYearsCalced / 45) * wage * maritialstatusperc;
    return parseInt(pensionWage, radix);
  };

  calcPensionWagePerYear = (wage, maritialStatus) => {
    const { radix } = this.state

    let maritialstatusperc = this.calcMaritialStatusPerc(maritialStatus)
    return parseInt(wage, radix) * maritialstatusperc;
  }

  calcRetireYear = (startYear) => {
    const { radix } = this.state
    return parseInt(startYear, radix) + 45
  }

  setFirst = (event) => {
    this.setState({
      firstname: event.target.value,
    })
  }

  setLast = (event) => {
    this.setState({
      lastname: event.target.value,
    })
  }

  setTel = (event) => {
    this.setState({
      tel: event.target.value,
    })
  }

  setEmail = (event) => {
    this.setState({
      email: event.target.value,
    })
  }

  handleScrollToElement = (event) => {
    const calcNode = ReactDOM.findDOMNode(this.refs.calc)
    calcNode.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  createWPPost = (event) => {
    event.preventDefault()

    const { firstname, lastname, tel, email } = this.state

    if(firstname !== '' && lastname !== '' && email !== ''){
      // WP API CREATE POST

      const wp = new WPAPI({
        endpoint: 'http://fluxwebdesign.be/customer/pensionisfun/wp-json/',
        username: 'restuser',
        password: 'restuser',
      })

      //IF 401 CANNOT CREATE POST: install plugin from GITHUB instead of Wordpress!

      wp.posts().create({
        title: `${firstname} ${lastname}`,
        content: `${firstname} ${lastname} ${email} ${tel}`,
        status: 'publish',
      }).then((response) => {
        // console.log( response )
        this.setSent()
      })

      // AXIOS CREATE CUSTOM posts -> NOR WORKING (YET)

      // axios.post('http://fluxwebdesign.be/customer/pensionisfun/wp-json/wp/v2/lead', {
      //   withCredentials: true,
      //   auth: {
      //       username: 'restuser',
      //       password: 'restuser'
      //   },
      //   params: {
      //     title: `${firstname} ${lastname}`,
      //     content: `${firstname} ${lastname} ${email} ${tel}`,
      //     status: 'publish',
      //   },
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        // },
    //})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    } else {
      alert('Gelieve alle velden in te vullen.');
    }
  }

  setSent = () => {
    this.setState({
      email: '',
      sent: true,
    })
  }

  render() {
    const { fields, resetAll } = this.props
    const { sent } = this.state

    // PENSION-AGE
    const pensionAge = 65; /* TODO: CALCULATE! */

    // let pensionWageNowPerYear = this.calcPensionWageNowPerYear(fields.startYear, fields.wage, fields.maritialstatus)
    // let pensionWageNowPerMonth = pensionWageNowPerYear / 12;

    let pensionWagePerYear = this.calcPensionWagePerYear(fields.wage, fields.maritialstatus);
    let pensionWagePerMonth = pensionWagePerYear / 12;

    let pensionYear = this.calcRetireYear(fields.startYear);


    if(!pensionWagePerYear){
      // pensionWageNowPerYear = "Niet genoeg gegevens opgegeven"
      // pensionWageNowPerMonth = "Niet genoeg gegevens opgegeven"
      pensionWagePerYear = "Niet genoeg gegevens opgegeven"
      pensionWagePerMonth = "Niet genoeg gegevens opgegeven"
    } else {
      // pensionWageNowPerYear = "€ " + pensionWageNowPerYear.toLocaleString('nl-BE', {maximumFractionDigits: 2})
      // pensionWageNowPerMonth = "€ " + pensionWageNowPerMonth.toLocaleString('nl-BE', {maximumFractionDigits: 2})
      pensionWagePerYear = "€ " + pensionWagePerYear.toLocaleString('nl-BE', {maximumFractionDigits: 2})
      pensionWagePerMonth = "€ " + pensionWagePerMonth.toLocaleString('nl-BE', {maximumFractionDigits: 2})
    }

    return (
      <div className="FinalPage">
          <Fragment>
            <h1>Jouw pensioen.</h1>
            {/*<div className="clearfix">
              <p>Zou u nu met pensioen gaan zou u een wettelijk pensioen ontvangen van ongeveer</p>
              <div className="block">
              <p className="pensionWage">{pensionWageNowPerYear}</p>
              <p className="per">per jaar</p>
              </div>
              <div className="block">
              <p className="pensionWage">{pensionWageNowPerMonth}</p>
              <p className="per">per maand</p>
              </div>
            </div>*/}
            <div className="clearfix">
              <div className="block">
                <p>U zal op pensioen kunnen gaan op</p>
                <p className="pensionAge">{pensionAge} jaar</p>
              </div>
              <div className="block">
                <p>U zal op pensioen kunnen gaan in</p>
                <p className="pensionAge">{pensionYear}</p>
              </div>
            </div>
            <div className="clearfix">
              <p>Zou u op uw {pensionAge}ste op pensioen gaan zou u een wettelijk pensioen ontvangen van ongeveer</p>
              <div className="block">
                <p className="pensionWage">{pensionWagePerYear}</p>
                <p className="per">per jaar</p>
              </div>
              <div className="block">
                <p className="pensionWage">{pensionWagePerMonth}</p>
                <p className="per">per maand</p>
              </div>
            </div>
            <div className="reset_wrap">
              <a className="reset" onClick={resetAll}>Herbeginnen</a>
              {fields.subjob !== '' &&
              <a className="calc" onClick={this.handleScrollToElement}>Berekening op maat</a>
              }
            </div>
            {fields.subjob !== '' &&
              <div className="contact_wrap">
                <div className="contact_text">
                  <h2>Wenst u een berekening op maat?</h2>
                  <p>Laat hieronder uw gegevens achter, we contacteren u zo spoedig mogelijk.</p>
                </div>

                {sent === false &&
                <form action="" className="contact_form" ref="calc">
                  <input type="text" name="first_name" placeholder="Voornaam" required onChange={this.setFirst}/>
                  <input type="text" name="last_name" placeholder="Familienaam" required onChange={this.setLast}/>
                  <input type="tel" name="tel" placeholder="Telefoon" required onChange={this.setTel}/>
                  <input type="email" name="email" placeholder="Email" required onChange={this.setEmail}/>
                  <input type="submit" value="Verzenden" onClick={this.createWPPost.bind(this)}/>
                </form>
                }

                {sent === true &&
                <p>Bedankt! Er zal spoedig met u contact opgenomen worden.</p>
                }

              </div>
            }
            <div className='video_wrap clearfix'>
              <div className='text_wrap'>
                <div className='text_wrap_inner'>
                  <h2>Hoezo pensioen is saai?</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae aspernatur iure, consectetur et architecto, possimus dicta fugit sint quia quas praesentium modi. Neque quia reprehenderit et in ab iure, blanditiis.</p>
                  <a className="button" href="https://flux.be">See it here!</a>
                </div>
              </div>
              <div className="player_wrap">
                <YouTubePlayer
                  className='react-player'
                  url='https://www.youtube.com/watch?v=d46Azg3Pm4c'
                  playing
                  controls
                  width='100%'
                  height='280px'
                />
              </div>
            </div>
          </Fragment>
      </div>
    );
  }
}

export default FinalPage;
