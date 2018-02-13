import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './App.css';

import CurrentPage from './components/CurrentPage/CurrentPage'
import FirstPage from './components/FirstPage/FirstPage'
import SecondPage from './components/SecondPage/SecondPage'
import ThirdPage from './components/ThirdPage/ThirdPage'
import FourthPage from './components/FourthPage/FourthPage'
import FifthPage from './components/FifthPage/FifthPage'
import SixthPage from './components/SixthPage/SixthPage'

import FinalPage from './components/FinalPage/FinalPage'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      gender: '',
      birthday: '',
      birthmonth: '',
      birthyear: '',
      maritialstatus: '',
      job: '',
      startYear: '',
      wage: '',
    }
  }

  selectGender = (val) => {
    this.setState({gender: val})
  };

  selectBirthDay = (val) => {
    this.setState({birthday: val})
  }

  selectBirthMonth = (val) => {
    this.setState({birthmonth: val})
  }

  selectBirthYear = (val) => {
    this.setState({birthyear: val})
  }

  selectMaritalStatus = (val) => {
    this.setState({maritialstatus: val})
  }

  selectJob = (val) => {
    this.setState({job: val})
  }

  selectStartYear = (val) => {
    this.setState({startYear: val})
  }

  selectWage = (val) => {
    this.setState({wage: val})
  }

  resetAll = () => {
    this.setState({
      page: 1,
      gender: '',
      birthday: '',
      birthmonth: '',
      birthyear: '',
      maritialstatus: '',
      job: '',
      startYear: '',
      wage: '',
    })
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage = () => {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { page, gender, birthday, birthmonth, birthyear, maritialstatus, job, startYear, wage } = this.state
    return (
      <div className="App">
        <div className="Page">
          <CSSTransitionGroup transitionName="slide" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            <CurrentPage page={page}/>
            {page === 1 && <FirstPage
              selectGender={this.selectGender}
              nextPage={this.nextPage}
              gender={gender}
              />}
            {page === 2 && <SecondPage
              selectBirthDay={this.selectBirthDay}
              selectBirthMonth={this.selectBirthMonth}
              selectBirthYear={this.selectBirthYear}
              nextPage={this.nextPage}
              prevPage={this.previousPage}
              birthday={birthday}
              birthmonth={birthmonth}
              birthyear={birthyear}
              />}
            {page === 3 && <ThirdPage
              selectMaritalStatus={this.selectMaritalStatus}
              nextPage={this.nextPage}
              prevPage={this.previousPage}
              maritialstatus={maritialstatus}
              />}
            {page === 4 && <FourthPage
              selectJob={this.selectJob}
              nextPage={this.nextPage}
              prevPage={this.previousPage}
              job={job}
              />}
            {page === 5 && <FifthPage
              selectStartYear={this.selectStartYear}
              nextPage={this.nextPage}
              prevPage={this.previousPage}
              startYear={startYear}
              />}
            {page === 6 && <SixthPage
              selectStartYear={this.selectWage}
              nextPage={this.nextPage}
              prevPage={this.previousPage}
              wage={wage}
              />}
            {page === 7 && <FinalPage
              resetAll={this.resetAll}
              fields={this.state}
              />}
              </CSSTransitionGroup>
          </div>
      </div>
    );
  }
}

export default App;
