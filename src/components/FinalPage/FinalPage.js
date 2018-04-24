import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import YouTubePlayer from 'react-player/lib/players/YouTube'
// import WPAPI from 'wpapi'
import axios from 'axios'

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
    // console.log('# of worked years: ' + numberOfWorkedYearsCalced + ' | wage: ' + wage + ' | Maritial status %: ' + maritialstatusperc);
    let pensionWage = (numberOfWorkedYearsCalced / 45) * wage * maritialstatusperc;
    return parseInt(pensionWage, radix);
  };

  calcPensionWagePerYear = (wage, maritialStatus) => {
    const { radix } = this.state

    let maritialstatusperc = this.calcMaritialStatusPerc(maritialStatus)
    return parseInt(wage, radix) * maritialstatusperc;
  }

  calcRetireYear = (startYear, birthYear) => {
    const { radix, currentYear } = this.state

    startYear = parseInt(startYear, radix)
    birthYear = parseInt(birthYear, radix)
    const workedYears = parseInt((currentYear - startYear), radix)

    if(workedYears >= 45){
      return startYear + 45
    }

    if(birthYear + 65 >= 2018 && birthYear + 65 <= 2024){
      return birthYear + 65
    } else if(birthYear + 66 >= 2025 && birthYear + 66 <= 2029){
      return birthYear + 66
    }

    return birthYear + 67
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

  handleScrollToTop = (event) => {
    const calcNode = ReactDOM.findDOMNode(this.refs.top)
    calcNode.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  createWPPost = (event) => {
    event.preventDefault()

    const { firstname, lastname, tel, email } = this.state
    const { birthday, birthmonth, birthyear, gender, job, maritialstatus, startYear, subjob, wage } = this.props.fields

    const post = {
      content: 'leeg',
      title: `${firstname} ${lastname}`,
      status: 'publish',
      // CPT
      type: 'lead',
      // ACFs
      fields: {
          voornaam: firstname,
          familienaam: lastname,
          email: email,
          tel: tel,
          geboortedatum: `${birthday}-${birthmonth}-${birthyear}`,
          geslacht: gender,
          job: `${job} ${subjob}`,
          status: maritialstatus,
          brutoloon: wage,
          startjaar: startYear,
      }
    }

    const config = {
        headers:
        {
          'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mbHV4d2ViZGVzaWduLmJlXC9jdXN0b21lclwvcGVuc2lvbmlzZnVuIiwiaWF0IjoxNTI0NDc2NTM2LCJuYmYiOjE1MjQ0NzY1MzYsImV4cCI6NjMxMTM4NTIwMCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMiJ9fX0.Gof9E4zNEEyqj1aHYam00LqMx_8kMqHoOknEABYZSZo"
        }
      };

    if(firstname !== '' && lastname !== '' && email !== ''){
      // AXIOS CREATE CUSTOM posts
      axios.post(`http://fluxwebdesign.be/customer/pensionisfun/wp-json/wp/v2/lead`, post, config)
          .then(response => {
              console.log(response.data)
              this.setSent()
          })
          .catch(err => {
              console.log(err)
          });

    } else {
      alert('Gelieve alle velden in te vullen.')
    }
  }

  setSent = () => {
    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      tel: '',
      sent: true,
    })
  }

  render() {
    const { fields, resetAll } = this.props
    const { sent } = this.state


    // let pensionWageNowPerYear = this.calcPensionWageNowPerYear(fields.startYear, fields.wage, fields.maritialstatus)
    // let pensionWageNowPerMonth = pensionWageNowPerYear / 12;

    let pensionWagePerYear = this.calcPensionWagePerYear(fields.wage, fields.maritialstatus);
    let pensionWagePerMonth = pensionWagePerYear / 12;

    let pensionYear = this.calcRetireYear(fields.startYear, fields.birthyear);
    // PENSION-AGE
    const pensionAge = pensionYear - fields.birthyear;


    if(!pensionWagePerYear){
      pensionWagePerYear = "Niet genoeg gegevens opgegeven"
      pensionWagePerMonth = "Niet genoeg gegevens opgegeven"
    } else {
      pensionWagePerYear = "€ " + pensionWagePerYear.toLocaleString('nl-BE', {maximumFractionDigits: 2})
      pensionWagePerMonth = "€ " + pensionWagePerMonth.toLocaleString('nl-BE', {maximumFractionDigits: 2})
    }

    return (
      <div className="FinalPage">
          <Fragment>
            <h1 ref="top">Jouw pensioen.</h1>
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
                <p>Je zal waarschijnlijk op pensioen kunnen gaan op</p>
                <p className="pensionAge">{pensionAge} jaar</p>
              </div>
              <div className="block">
                <p>Je zal waarschijnlijk op pensioen kunnen gaan in</p>
                <p className="pensionAge">{pensionYear}</p>
              </div>
            </div>
            <div className="clearfix">
              <p>Zou je op je {pensionAge}ste op pensioen gaan zou je waarschijnlijk een wettelijk pensioen ontvangen van ongeveer</p>
              <div className="block">
                <p className="pensionWage">{pensionWagePerYear}</p>
                <p className="per">per jaar</p>
              </div>
              <div className="block">
                <p className="pensionWage">{pensionWagePerMonth}</p>
                <p className="per">per maand</p>
              </div>
            </div>

            {fields.subjob === '' &&
            <div className="clearfix">
            <p className="smalltext">Deze berekening is louter een schatting van jouw wettelijk pensioen. Voor een gedetailleerde berekening surf je best naar <a class="link" href="http://mypension.be" target="_blank" rel="noopener noreferrer">mypension.be</a>. Heb je dit nog nooit gedaan? Bekijk onze tutorial met live uitleg en ontdek alles wat MyPension te bieden heeft.</p>
            </div>
            }

            {fields.subjob !== '' &&
            <div className="clearfix">
              <p className="smalltext">Deze berekening is louter een schatting van jouw wettelijk pensioen. Heb je graag een meer gedetailleerde berekening? Neem dan contact met ons op.</p>
            </div>
            }

            <div className="reset_wrap">
              <a className="btn reset" onClick={() => { this.handleScrollToTop(); resetAll(); }}>Herbeginnen</a>
              {fields.subjob !== '' &&
              <a className="btn calc" onClick={this.handleScrollToElement}>Berekening op maat</a>
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
                <p>Bedankt! We nemen zo snel mogelijk contact met je op.</p>
                }

              </div>
            }
            <div className='video_wrap clearfix'>
              <div className='text_wrap'>
                <div className='text_wrap_inner'>
                  <h2>Hoezo pensioen is saai?</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae aspernatur iure, consectetur et architecto, possimus dicta fugit sint quia quas praesentium modi. Neque quia reprehenderit et in ab iure, blanditiis.</p>
                  <a className="button" href="https://google.be" target="_blank" rel="noopener noreferrer">See it here!</a>
                </div>
              </div>
              <div className="player_wrap">
                <YouTubePlayer
                  className='react-player'
                  url='https://www.youtube.com/watch?v=d46Azg3Pm4c'
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
