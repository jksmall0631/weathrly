const React = require('react');
const ReactDOM = require('react-dom');
let $ = require('jquery');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      data: null,
    };
    this.updateSubmit = this.updateSubmit.bind(this);
  }

  updateProperties(loc, data) {
    this.setState({ location: loc, data: data });
  }

  updateSubmit(location) {
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?q=' + location + '&APPID=e93493c31b39ffb87f0f7668675192ce').then((filteredWeather) => {
      debugger;
      let loc = filteredWeather.city.name;
      let dataArray = filteredWeather.list;
      let data = dataArray.map((weather) => {
        return {temp: weather.main.temp, desc: weather.weather[0].description}
      });
      this.updateProperties(loc, data);
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
      <DailyWeather data = {appState} />
    </ul>
  );
};

const DailyWeather = ({data}) => {
    // let temperature = data.filter(()=>{
    //   Object.getOwnPropertyNames()
    // });
    // let whatever = dat
  return (
    <article>
    <h1>{data}</h1>
    <h2></h2>
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
