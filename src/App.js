import './App.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { Header } from './components/Header';
import { CurrentW } from './components/CurrentW';
import { ForecastDaily } from './components/ForecastDaily';


function App() {
  
  let apiKey;
  const apiUrl = 'http://api.weatherapi.com/v1';

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState('warsaw');
  const [dailyForecastExpanded, setDailyForecastExpanded] = useState(false);

  useEffect(() =>{
    if(process.env.NODE_ENV !== 'production'){
        apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    }else{
        
    }

    getCurrentWeather();
    getforecast();
  }, [])

  const getCurrentWeather = async () =>{
    try {
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
    } catch (error) {
        console.log(error);
    }
  }

  const toggleExpand = () =>{
    setDailyForecastExpanded(!dailyForecastExpanded);
  }


  return (
    <div className="App">
      <Header/>
      <div className="container">
        {currentWeather !== null &&  <CurrentW currentWeather={currentWeather}/>}
        {forecast !== null &&  <ForecastDaily forecast={forecast} dailyForecastExpanded={dailyForecastExpanded} toggleExpand={toggleExpand}/>}
      </div>
    </div>
  );
}

export default App;
