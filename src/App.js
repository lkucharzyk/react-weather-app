import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { Header } from './components/Header';
import { CurrentW } from './components/CurrentW';
import { ForecastDaily } from './components/ForecastDaily'
import { HourlyForecast } from './components/HourlyForecast';
import { Location } from './components/Location';


function App() {
  
  let apiKey;
  if(process.env.NODE_ENV !== 'production'){
    apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  }else{
      
  }
  const apiUrl = 'http://api.weatherapi.com/v1';

  const [currentWeather, setCurrentWeather] = useState({
    data: null,
    loading: true
  });
  const [forecast, setForecast] = useState({
    data: null,
    loading: true
  });
  const [location, setLocation] = useState('52.1847,21.0002');
  const [markerAnchor, setMarkerAnchor] = useState([52.1847, 21.0002]);
  const [dailyForecastExpanded, setDailyForecastExpanded] = useState(true);
  const [hourlyForecastDay, setHourlyForecastDay] = useState(null);

  useEffect(() =>{
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
      setCurrentWeather({
        ...currentWeather,
        loading: true
      });
      const res = await axios.get(`${apiUrl}/current.json?key=${apiKey}&q=${location}`);
      setCurrentWeather({
        data: res.data,
        loading: false
      });
      
    } catch (error) {
        console.log(error);
    }
  }

  const getforecast = async () =>{
    try {
      setForecast({
        ...forecast,
        loading: true
      });
      const res = await axios.get(`${apiUrl}/forecast.json?key=${apiKey}&q=${location}&days=10`);
      setForecast({
        data: res.data.forecast,
        loading: false
      });
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

  const changeLocation = location =>{    
    setLocation(location);
    
  }

  
  const changeMarkerAnchor = anchor => setMarkerAnchor(anchor);


  return (
    <div className="App">
      <Header/>
      <div className="container">
        <div className="column">
          {!currentWeather.loading ?  <Location location={currentWeather.data.location} markerAnchor={markerAnchor} changeMarkerAnchor={changeMarkerAnchor} changeLocation={changeLocation}/> : <p>Loading data...</p>}
          {!currentWeather.loading ?  <CurrentW currentWeather={currentWeather.data}/> : <p>Loading data...</p>}
          {!forecast.loading ?  <HourlyForecast forecast={forecast.data}  hourlyForecastDay={hourlyForecastDay} changeHourlyForecastDay={changeHourlyForecastDay}/> : <p>Loading data...</p>}
          
          </div>
        <div className="column">
          {!forecast.loading?  <ForecastDaily forecast={forecast.data} dailyForecastExpanded={dailyForecastExpanded} toggleExpand={toggleExpand}/> : <p>Loading data...</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
