import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './Buttons.css';

class Buttons extends Component {
  render() {
    const { nextPage, prevPage } = this.props

    if(nextPage !== undefined && prevPage !== undefined){
      // console.log('both')
      return (
        <div className="Buttons">
          <a onClick={nextPage}>
            <FontAwesome
              className='nextPage'
              name='chevron-right'
            />
          </a>
          <a onClick={prevPage}>
            <FontAwesome
              className='prevPage'
              name='chevron-left'
            />
          </a>
        </div>
      );
    }

    if(nextPage !== undefined && prevPage === undefined){
      // console.log('only next')
      return (
        <div className="Buttons">
          <a onClick={nextPage}>
            <FontAwesome
              className='nextPage'
              name='chevron-right'
            />
          </a>
        </div>
      );
    }

    if(nextPage === undefined && prevPage !== undefined){
      // console.log('only prev')
      return (
        <div className="Buttons">
          <a onClick={prevPage}>
            <FontAwesome
              className='prevPage'
              name='chevron-left'
            />
          </a>
        </div>
      );
    }

    return

  }
}

export default Buttons;
