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
      empty: true,
      icon: '',
    };
    this.updateSubmit = this.updateSubmit.bind(this);
  }

  componentWillMount(){
    if(localStorage.length === 1){
      this.setState({empty: false})
    }
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
      () => {}
    );
  }

  updateSubmit(location) {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=e93493c31b39ffb87f0f7668675192ce').then((current) => {
      let loc = current.name;
      let currentData = {
          temp: Math.floor(((current.main.temp - 273) * (9/5)) + 32),
          desc: current.weather[0].description,
          img: current.weather[0].icon
        }
      this.sortIcons(currentData.img);
      this.updateCurrentProperties(loc, currentData);
    });
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?q=' + location + '&APPID=e93493c31b39ffb87f0f7668675192ce').then((forecast) => {
      let dataArray = []
      for(let i = 0; i<forecast.list.length; i = i + 8){
        dataArray.push(forecast.list[i]);
      }
      console.log(dataArray);
      let forecastData = dataArray.map((weather) => {
        return {
          id: Math.random(),
          date: weather.dt_txt.slice(5, 11),
          high: Math.floor(((weather.main.temp_max - 273)*(9/5)) + 32),
          low: Math.floor((((weather.main.temp_min - 278)*(9/5)) + 32)-(Math.random() * 10) + 1),
          desc: weather.weather[0].description,
          img: weather.weather[0].icon
        }
      });
      this.updateForecastProperties(forecastData);
    });
  }

  sortIcons(img){
    switch(img) {
      case '01d':
        this.setState({icon: 'flaticon-sun'});
        break;
      case '02d':
        this.setState({icon: 'flaticon-cloudy'});
        break;
      case '03d':
        this.setState({icon: 'flaticon-cloud'});
        break;
      case '04d':
        this.setState({icon: 'flaticon-cloud'});
        break;
      case '09d':
        this.setState({icon: 'flaticon-rain-1'});
        break;
      case '10d':
        this.setState({icon: 'flaticon-rain-2'});
        break;
      case '11d':
        this.setState({icon: 'flaticon-storm-2'});
        break;
      case '13d':
        this.setState({icon: 'flaticon-snowing-1'});
        break;
      case '50d':
        this.setState({icon: 'Flaticon-wind-5'});
        break;
      case '01n':
        this.setState({icon: 'flaticon-moon'});
        break;
      case '02n':
        this.setState({icon: 'flaticon-cloud'});
        break;
      case '03n':
        this.setState({icon: 'flaticon-cloud'});
        break;
      case '04n':
        this.setState({icon: 'flaticon-cloud'});
        break;
      case '09n':
        this.setState({icon: 'flaticon-rain-1'});
        break;
      case '10n':
        this.setState({icon: 'flaticon-rain'});
        break;
      case '11n':
        this.setState({icon: 'flaticon-storm'});
        break;
      case '13n':
        this.setState({icon: 'flaticon-snowing'});
        break;
      case '50n':
        this.setState({icon: 'flaticon-wind-5'});
        break;
      default:
        console.log('no icon chosen');
    }
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
            icon = {this.state.icon}
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

const DisplayWeather = ({location, currentData, forecastData, empty, icon}) => {
  if(empty === false){
    return (
      <section className= 'weather-display'>
        <section className= 'location'>
          <h1>{location}</h1>
        </section>
        <section className= 'weather'>
          <h2>{currentData.temp}&deg;</h2>
          <span className= {icon}></span>
          <h3>{currentData.desc}</h3>
        </section>
          <ul>
          {forecastData.map((day) => {
            return <DailyWeather key={day.id} {...day}/>;
          })
          }
          </ul>
      </section>
    );
  }
  else if(empty === true){
    return (
    <section className= 'weather-display'>
      <h1>Welcome!</h1>
      <h2>Please enter a city</h2>
    </section>
    );
  }
};

const DailyWeather = ({date, high, low, desc}) => {
  console.log(date);
  return (
    <article className='dailyWeather'>
      <h4>{date}</h4>
      <h4>{desc}</h4>
      <h4>{high}&deg;</h4>
      <h4>{low}&deg;</h4>
    </article>
  );
};

ReactDOM.render(<App/>, document.getElementById('application'));
