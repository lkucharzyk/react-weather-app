import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { Header } from './components/Header';
import { CurrentW } from './components/CurrentW';
import { ForecastDaily } from './components/ForecastDaily'
import { HourlyForecast } from './components/HourlyForecast';
import { Location } from './components/Location';
import { IconsMenu } from './components/IconsMenu';


function App() {
  
  let apiKey;
  if(process.env.NODE_ENV !== 'production'){
    apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  }else{
      
  }
  const apiUrl = 'http://api.weatherapi.com/v1';

  const [currentWeather, setCurrentWeather] = useState({
    data: null,
    loading: true,
    firstLoad: true,
    noLocationData: false
  });
  const [forecast, setForecast] = useState({
    data: null,
    loading: true,
    firstLoad: true
  });
  const [location, setLocation] = useState('52.1847,21.0002');
  const [markerAnchor, setMarkerAnchor] = useState([52.1847, 21.0002]);
  const [dailyForecastExpanded, setDailyForecastExpanded] = useState(true);
  const [hourlyForecastDay, setHourlyForecastDay] = useState(null);

  useEffect(() =>{
   // getUserLocation();
    getCurrentWeather();
    getforecast();
  },[location])


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
        loading: true,
      });
      const res = await axios.get(`${apiUrl}/current.json?key=${apiKey}&q=${location}`);
      setCurrentWeather({
        data: res.data,
        loading: false,
        firstLoad: false
      });
      
    } catch (error) {
      if(error.response.data.error.code === 1006){
        console.log('Sorry, no data for selected location', error );
        setCurrentWeather({
          ...currentWeather,
          loading: false,
          noLocationData: true
        });
      }else{
        console.log(error);
      }
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
        loading: false,
        firstLoad: false
      });
      setHourlyForecastDay(res.data.forecast.forecastday[0])
    } catch (error) {
      if(error.response.data.error.code === 1006){
        console.log('Sorry, no data for selected location', error );
        setForecast({
          ...forecast,
          loading: false,
          noLocationData: true
        });
      }else{
        console.log(error);
      }
    }
  }

  const toggleExpand = () =>{
    setDailyForecastExpanded(!dailyForecastExpanded);
  }

  const changeHourlyForecastDay = day =>{
    setHourlyForecastDay(day)
  }

  const changeLocation = loc =>{  
    setLocation(loc)
  }

  
  const changeMarkerAnchor = anchor => setMarkerAnchor(anchor);


  return (
    <div className="App">
      <Header/>
      <div className="container">
        <div className="column">
          {<Location currentWeather={currentWeather.data} markerAnchor={markerAnchor} loading={currentWeather.loading} firstLoad={currentWeather.firstLoad} noLocationData={currentWeather.noLocationData} changeMarkerAnchor={changeMarkerAnchor} changeLocation={changeLocation}/>}
          {<CurrentW currentWeather={currentWeather.data} loading={currentWeather.loading} firstLoad={currentWeather.firstLoad}/>}
          {!forecast.firstLoad ? <HourlyForecast forecast={forecast.data}  hourlyForecastDay={hourlyForecastDay} loading={forecast.loading} firstLoad={forecast.firstLoad} changeHourlyForecastDay={changeHourlyForecastDay}/> : <div className='loading'></div>}
          
          </div>
        <div className="column">
          <ForecastDaily forecast={forecast.data} loading={forecast.loading} firstLoad={forecast.firstLoad} dailyForecastExpanded={dailyForecastExpanded} toggleExpand={toggleExpand}/>
        </div>
      </div>
      <IconsMenu/>
    </div>
  );
}

export default App;
