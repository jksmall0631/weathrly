import React, { Component } from 'react';

export default class LocationInput extends React.Component {
  constructor() {
    super();
    this.state={
      location: '',
    }
    this.updateProperties = this.updateProperties.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateProperties(e) {
    let value = e.target.value;
    this.setState({location: value })
  }

  handleSubmit(){
    this.props.updateSubmit(this.state.location)
  }

  render() {
    return (
      <header className='header'>
        <img src='lib/Weathrly-logo2.png' alt='Weathrly-logo'></img>
        <input
          className='location-input'
          type='text'
          placeholder='location'
          name='location'
          onChange={this.updateProperties}
          value={this.state.location}
        />
        <button
          className="submit-button"
          onClick={this.handleSubmit}
        >
        submit
        </button>
      </header>
    );
  }
}
