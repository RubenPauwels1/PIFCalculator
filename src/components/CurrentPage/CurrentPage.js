import React, { Component } from 'react';
import './CurrentPage.css';

class CurrentPage extends Component {
  render() {
    const { page } = this.props
    return (
      <div className="CurrentPage">
        {page}
      </div>
    );
  }
}

export default CurrentPage;
