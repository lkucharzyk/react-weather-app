import './App.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Header } from './components/Header';
import { CurrentW } from './components/CurrentW';
import { ForecastDaily } from './components/ForecastDaily'
import { HourlyForecast } from './components/HourlyForecast';
import { Location } from './components/Location';


function App() {
  
  let apiKey;
  const apiUrl = 'http://api.weatherapi.com/v1';

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState('52.1347,21.0042');
  const [dailyForecastExpanded, setDailyForecastExpanded] = useState(true);
  const [hourlyForecastDay, setHourlyForecastDay] = useState(null);

  useEffect(() =>{
    if(process.env.NODE_ENV !== 'production'){
        apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    }else{
        
    }

   // getUserLocation();
    getCurrentWeather();
    getforecast();
  }, [])

  // const getUserLocation = ()=>{
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(success, error);
  //   } else {
  //     console.log("Geolocation not supported");
  //   }
    
  //   function success(position) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;
  //     setLocation(`${latitude},${longitude}`);
  //   }
    
  //   function error() {
  //     console.log("Unable to retrieve your location");
  //   }
  // }

  const getCurrentWeather = async () =>{
    try {
      console.log(location);
      const res = await axios.get(`${apiUrl}/current.json?key=${apiKey}&q=${location}`);
      setCurrentWeather(res.data);
      
    } catch (error) {
        console.log(error);
    }
  }

  const getforecast = async () =>{
    try {
      const res = await axios.get(`${apiUrl}/forecast.json?key=${apiKey}&q=${location}&days=10`);
      setForecast(res.data.forecast);
      setHourlyForecastDay(res.data.forecast.forecastday[0])
    } catch (error) {
        console.log(error);
    }
  }

  const toggleExpand = () =>{
    setDailyForecastExpanded(!dailyForecastExpanded);
  }

  const changeHourlyForecastDay = day =>{
    setHourlyForecastDay(day)
  }


  return (
    <div className="App">
      <Header/>
      <div className="container">
        <div className="column">
          {currentWeather !== null ?  <Location location={currentWeather.location}/> : <p>Loading data...</p>}
          {currentWeather !== null ?  <CurrentW currentWeather={currentWeather}/> : <p>Loading data...</p>}
          {forecast !== null ?  <HourlyForecast forecast={forecast}  hourlyForecastDay={hourlyForecastDay} changeHourlyForecastDay={changeHourlyForecastDay}/> : <p>Loading data...</p>}
          
          </div>
        <div className="column">
          {forecast !== null ?  <ForecastDaily forecast={forecast} dailyForecastExpanded={dailyForecastExpanded} toggleExpand={toggleExpand}/> : <p>Loading data...</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
