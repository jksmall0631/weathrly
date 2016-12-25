import React, { Component } from 'react';

import DailyWeather from './DailyWeather';

const DisplayWeather = ({location, currentData, forecastData, empty, icon}) => {
  if(empty === false){
    return (
      <section className= 'weather-display'>
        <section className= 'location'>
          <h1>{location}</h1>
        </section>
        <section className= 'weather'>
          <h2>{currentData.temp}&deg;</h2>
          <span className= {currentData.img}></span>
          <h3>{currentData.desc}</h3>
        </section>
          <ul>
          {forecastData.map((day) => {
            return <DailyWeather key={day.id}{...day}/>;
          })
          }
          </ul>
      </section>
    );
  }
  else if(empty === true){
    return (
    <section className= 'welcome'>
      <h1>Welcome!</h1>
      <h2>Please enter a city</h2>
    </section>
    );
  }
};

export default DisplayWeather;
