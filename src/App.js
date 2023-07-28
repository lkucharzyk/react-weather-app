import './App.scss';
import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { CurrentW } from './components/CurrentW';

function App() {
  
  let apiKey;
  const apiUrl = 'http://api.weatherapi.com/v1';

  const [currentWeather, setCurrentWeather] = useState(null);
  const [location, setLocation] = useState('warsaw');

  useEffect(() =>{
    if(process.env.NODE_ENV !== 'production'){
        apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    }else{
        
    }

    getCurrentWeather();
    forecast();
  }, [])

  const getCurrentWeather = async () =>{
    try {
      const res = await axios.get(`${apiUrl}/current.json?key=${apiKey}&q=${location}`);
      setCurrentWeather(res.data);
    } catch (error) {
        console.log(error);
    }
  }

  const forecast = async () =>{
    const res = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=49.4304&longitude=22.5938&hourly=temperature_2m,rain&daily=temperature_2m_max&timezone=Europe%2FBerlin');
    //console.log(res);
  }


  return (
    <div className="App">
      <Header/>
      <div className="container">
        {currentWeather !== null &&  <CurrentW currentWeather={currentWeather}/>}
      </div>
    </div>
  );
}

export default App;
