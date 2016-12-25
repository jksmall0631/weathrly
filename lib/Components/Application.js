import React, { Component } from 'react';
let $ = require('jquery');

import LocationInput from './LocationInput';
import DisplayWeather from './DisplayWeather';

export default class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      currentData: '',
      forecastData: [],
      empty: true,
    };
    this.updateSubmit = this.updateSubmit.bind(this);
  }

  componentDidMount(){
    if(localStorage.length === 1){
      this.updateSubmit(localStorage.getItem(location));
    }
  }

  updateCurrentProperties(loc, currentData) {
    this.setState({ location: loc, currentData: currentData },
    () => {
      localStorage.setItem(location, JSON.stringify(this.state.location));
      this.setState({empty: false})
    });
  }

  updateForecastProperties(forecastData) {
    this.setState(
      { forecastData: forecastData },
    );
  }

  updateSubmit(location) {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=e93493c31b39ffb87f0f7668675192ce').then((current) => {
      let loc = current.name;
      let currentData = {
          temp: Math.floor(((current.main.temp - 273) * (9/5)) + 32),
          desc: current.weather[0].description,
          img: this.filterImg(current),
        }
      this.updateCurrentProperties(loc, currentData);
    });

    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?q=' + location + '&APPID=e93493c31b39ffb87f0f7668675192ce').then((forecast) => {
      let dataArray = [];
      for(let i = 0; i<forecast.list.length; i = i + 8){
        dataArray.push(forecast.list[i]);
      }

      let iconArray = dataArray.map((current)=>{
        return this.filterImg(current);
      });

      let forecastData = dataArray.map((weather, i) => {
        return {
          id: Math.random(),
          date: weather.dt_txt.slice(5, 11),
          high: Math.floor(((weather.main.temp_max - 273)*(9/5)) + 32),
          low: Math.floor((((weather.main.temp_min - 278)*(9/5)) + 32)-(Math.random() * 10) + 1),
          desc: weather.weather[0].description,
          img: iconArray[i],
        }
      });
      this.updateForecastProperties(forecastData);
    });
  }

  filterImg(current){
    let currentIcon = current.weather[0].icon
    let icon = {
      '01d': 'flaticon-sun',
      '02d': 'flaticon-cloudy',
      '03d': 'flaticon-cloud',
      '04d': 'flaticon-cloud',
      '09d': 'flaticon-rain-1',
      '10d': 'flaticon-rain-2',
      '11d': 'flaticon-storm-2',
      '13d': 'flaticon-snowing-1',
      '50d': 'flaticon-umbrella',
      '01n': 'flaticon-moon',
      '02n': 'flaticon-cloud',
      '03n': 'flaticon-cloud',
      '04n': 'flaticon-cloud',
      '09n': 'flaticon-rain-1',
      '10n': 'flaticon-rain',
      '11n': 'flaticon-storm',
      '13n': 'flaticon-snowing',
      '50n': 'flaticon-umbrella',
    }[`${currentIcon}`];
    return icon;
  }

  render() {
    return (
      <section className="main">
          <LocationInput updateSubmit= {this.updateSubmit}/>
          <DisplayWeather
            location= {this.state.location}
            currentData = {this.state.currentData}
            forecastData = {this.state.forecastData}
            empty = {this.state.empty}
          />
      </section>
    );
  }
}
