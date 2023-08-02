import React from 'react'
import { ForecastHour } from './ForecastHour';

export const HourlyForecast = ({hourlyForecastDay, forecast, loading, changeHourlyForecastDay}) => {
    const prevDay = forecast.forecastday[forecast.forecastday.indexOf(hourlyForecastDay) -1];
    const nextDay = forecast.forecastday[forecast.forecastday.indexOf(hourlyForecastDay) +1];

    const onClick = e =>{
      if(e.target.classList.contains('prev') || e.target.parentNode.classList.contains('prev') ){
        changeHourlyForecastDay(prevDay)
      }else if(e.target.classList.contains('next') || e.target.parentNode.classList.contains('next') ){
        changeHourlyForecastDay(nextDay)
      }
    }
  

  return (
    <section className='main-module'>
        <div className='header'>
            <h2>Hourly Forecast</h2>
        </div>
        <div className="loading-wraper">
          {loading && <div className="loading"><p>Loading new location...</p></div>}
        </div>

        <div className="day-select" onClick={onClick}>
          {!prevDay ?  (<p>---</p>) : (<p className='prev'><i class="fa-solid fa-angle-left"></i> {prevDay.date}  </p>)} 
          <h5>{hourlyForecastDay.date}</h5>
          {!nextDay ?  (<p>---</p>) : (<p className='next'>{nextDay.date}  <i class="fa-solid fa-angle-right"></i></p>)} 
        </div>

        {hourlyForecastDay.hour.map(hour => <ForecastHour hour={hour} key={hour.time}/>)}

        
        
    </section>
  )
}
