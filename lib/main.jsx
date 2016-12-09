const React = require('react');
const ReactDOM = require('react-dom');
let $ = require('jquery');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      locationWeather: [],
    };
    this.updateSubmit = this.updateSubmit.bind(this);
  }

  updateProperties(filteredWeather) {
    filteredWeather.forEach((item)=>{
      Object.assign(item, { key: Date.now() });
    })
    this.setState({locationWeather: filteredWeather});
  }

// 'http://weatherly-api.herokuapp.com/api/weather'
  updateSubmit(location) {
    $.getJSON('http://weatherly-api.herokuapp.com/api/weather').then((weather)=>{
      let filteredWeather = weather.filter((weatherArray)=>{
        return weatherArray.location === location;
      });

      this.updateProperties(filteredWeather);
    });
  }

  render() {
    return (
      <section>
          <LocationInput updateSubmit= {this.updateSubmit}/>
          <DisplayWeather appState= {this.state.locationWeather}/>
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

const DisplayWeather = ({appState}) => {
  return (
    <ul>
      {appState.map((weather) => {
         return <DailyWeather key = {weather.id} date = {weather.date} hourl = {weather.hourly}/>
       })
      }
    </ul>
  );
};

const DailyWeather = ({date, hourly}) => {
  return (
    <article>
    <h1>{date}</h1>
    <h2>{hourly}</h2>
    </article>
  );
};

//keep
// class DisplayWeather extends React.Component {
//
//   render() {
//     return (
//       <main>
//         <DailyWeather />
//         <DailyWeather />
//         <DailyWeather />
//         <DailyWeather />
//         <DailyWeather />
//         <DailyWeather />
//         <DailyWeather />
//       </main>
//     );
//   }
// }

// class DailyWeather extends React.Component {
//   render(){
//     return (
//       <article>hot hot hot</article>
//     )
//   }
// }

ReactDOM.render(<App/>, document.getElementById('application'));
