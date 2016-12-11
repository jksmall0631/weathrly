const React = require('react');
const ReactDOM = require('react-dom');
let $ = require('jquery');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null,
      currentData: '',
      forecastData: [],
      empty: true
    };
    this.updateSubmit = this.updateSubmit.bind(this);
  }

  componentDidMount(){
    if(localStorage.length === 1){
      this.setState({empty: false})
      this.updateSubmit(localStorage.getItem(location));
    }
  }


  updateCurrentProperties(loc, currentData) {
    this.setState({ location: loc, currentData: currentData },
    () => {
      localStorage.setItem(location, JSON.stringify(this.state.location));
    });
  }

  updateForecastProperties(forecastData) {
    this.setState(
      { forecastData: forecastData },
      () => {}
    );
  }

  updateSubmit(location) {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=e93493c31b39ffb87f0f7668675192ce').then((current) => {
      let loc = current.name;
      let currentData = {
          temp: current.main.temp,
          desc: current.weather[0].description,
          img: current.weather[0].icon
        }
      this.updateCurrentProperties(loc, currentData);
    });
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?q=' + location + '&APPID=e93493c31b39ffb87f0f7668675192ce').then((forecast) => {
      let dataArray = forecast.list;
      let forecastData = dataArray.map((weather) => {
        return {
          id: Math.random(),
          date: weather.dt_text,
          high: weather.main.temp_max,
          low: weather.main.temp_min,
          desc: weather.weather[0].description,
          img: weather.weather[0].icon
        }
      });
      this.updateForecastProperties(forecastData);
    });
  }

  render() {
    return (
      <section>
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

class LocationInput extends React.Component {
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
      <header>
        <input
          type='text'
          className='LocationInput'
          placeholder='location'
          name='location'
          onChange={this.updateProperties}
          value={this.state.location}
        />
        <button
          className="SubmitButton"
          onClick={this.handleSubmit}
        >
        submit
        </button>
      </header>
    );
  }
}

const DisplayWeather = ({location, currentData, forecastData, empty}) => {
  return (
    <section>
      <h1>{location}</h1>
      <h2>{currentData.desc}</h2>
      <h3>{currentData.temp}</h3>
      <ul>
      {forecastData.map((day) => {
        return <DailyWeather key={day.id} {...day}/>;
      })
      }
      </ul>
    </section>
  );
};

const DailyWeather = ({date, high, low, desc}) => {
  return (
    <article>
      <h3>{date}</h3>
      <h4>{desc}</h4>
      <h4>{high}</h4>
      <h4>{low}</h4>
    </article>
  );
};

ReactDOM.render(<App/>, document.getElementById('application'));
