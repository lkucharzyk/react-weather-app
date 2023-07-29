import React from 'react'

export const ForecastDay = ({dayForecast}) => {
  const {day} = dayForecast 
  return (
    <section className='sub-module forecast-day'>
        <div className="header">
          <div className="text">
            <h5>{dayForecast.date}</h5>
            <p>{day.condition.text}</p>
          </div>
           <img src={dayForecast.day.condition.icon} alt="" srcset="" />
        </div>
        
        <ul>
            <li><i class="fa-solid fa-temperature-low"/>{day.avgtemp_c} &#176;C</li>
            <li><i class="fa-solid fa-droplet"></i>{day.totalprecip_mm} mm</li>
        </ul>
    </section>
  )
}
