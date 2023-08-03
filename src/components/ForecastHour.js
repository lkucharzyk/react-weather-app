import React from 'react'

export const ForecastHour = ({hour}) => {

  const date = new Date();
  const currentHour = date.getHours();

  return (<section className={`forecast-hour ${+hour.time.slice(11, 13) ==currentHour ? 'current-hour' : ''}`}>
  
            <h5>{hour.time.slice(11, 13)} </h5>
            <div><i class="fa-solid fa-temperature-low"/>{hour.temp_c} &#176;C</div>
            <div><i class="fa-solid fa-droplet"></i>{hour.precip_mm} mm</div>
            <div><img src={hour.condition.icon} alt="" srcset="" /></div>
        </section>
  )
}
