import React, { Component } from 'react';

const DailyWeather = ({date, high, low, desc, img}) => {
  return (
    <article className='dailyWeather'>
      <div className='desc'>
        <h1>{date}</h1>
        <h2>{desc}</h2>
      </div>
      <span className= {img}></span>
      <div className='temp'>
        <p className='low'>{low}&deg;</p>
        <p className='high'>- {high}&deg;</p>
      </div>
    </article>
  );
};

export default DailyWeather;
