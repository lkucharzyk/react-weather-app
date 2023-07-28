import { useEffect } from 'react';

export const CurrentW = ({currentWeather}) => {

  // useEffect(() =>{
  //   console.log(currentWeather.current);
  // })

  return (
    <section className='main-module'>
        <h2>Current Weather</h2>
        <ul>
            <li><i class="fa-solid fa-temperature-low"/>{currentWeather.current.temp_c} &#176;C</li>
            <li><i class="fa-solid fa-wind"/>{currentWeather.current.wind_kph} km/H</li>
        </ul>
    </section>
  )
}
