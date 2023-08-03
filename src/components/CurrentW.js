import { useEffect } from 'react';

export const CurrentW = ({currentWeather, loading, firstLoad}) => {

  return (
    <section className='main-module' id='current'>
        <h2>Current Weather</h2>
        {firstLoad ? 'Loading...' :
        <>
        <div className="loading-wraper">
         {loading && !firstLoad && <div className="loading"><p>Loading new location...</p></div>}
        </div>
        <ul>
            <li><i class="fa-solid fa-temperature-low"/>{currentWeather.current.temp_c} &#176;C</li>
            <li><i class="fa-solid fa-droplet"></i>{currentWeather.current.precip_mm} mm</li>
            <li><i class="fa-solid fa-wind"/>{currentWeather.current.wind_kph} km/H</li>
        </ul>
        </>
        }
        
    </section>
  )
}
