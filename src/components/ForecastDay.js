import React from 'react'

export const ForecastDay = ({dayForecast}) => {
  return (
    <section className='sub-module'>
        <h5>{dayForecast.date}</h5>
        <ul>
            <li><i class="fa-solid fa-temperature-low"/>{dayForecast.day.avgtemp_c} &#176;C</li>
            <li><i class="fa-solid fa-droplet"></i>{dayForecast.day.totalprecip_mm} mm</li>
        </ul>
    </section>
  )
}
