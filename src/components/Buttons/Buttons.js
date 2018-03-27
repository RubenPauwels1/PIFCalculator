import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import './Buttons.css'

class Buttons extends Component {
  render () {
    const { nextPage, prevPage } = this.props

      if(nextPage !== undefined && prevPage !== undefined){
        return (
          <div className='Buttons' >
            <a onClick={nextPage} className='button'>
              <FontAwesome
                className='nextPage'
                name='long-arrow-right'
                size='lg'
              />
            </a>
            <a onClick={prevPage} className='button'>
              <FontAwesome
                className='prevPage'
                name='long-arrow-left'
                size='lg'
              />
            </a>
          </div>
        )
      }

      if(nextPage !== undefined && prevPage === undefined){
        return (
          <div className='Buttons'>
            <a onClick={nextPage} className='button'>
              <FontAwesome
                className='nextPage'
                name='long-arrow-right'
                size='lg'
              />
            </a>
          </div>
        )
      }

      if(nextPage === undefined && prevPage !== undefined){
        return (
          <div className='Buttons'>
            <a onClick={prevPage} className='button'>
              <FontAwesome
                className='prevPage'
                name='long-arrow-left'
                size='lg'
              />
            </a>
          </div>
        )
      }

    return (null)
  }
}

export default Buttons
