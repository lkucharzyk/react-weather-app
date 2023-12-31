import { useEffect} from 'react';
import { ForecastDay } from './ForecastDay';

export const ForecastDaily = ({forecast, dailyForecastExpanded, loading, firstLoad, toggleExpand}) => {
  return (
    <section className={`main-module ${!dailyForecastExpanded && 'rolled'}`} id='daily'>
        <div className='header' onClick={toggleExpand}>
            <h2>Daily Forecast</h2><i class="fa-solid fa-angle-down"></i>
        </div>
        <div className="loading-wraper">
          {loading && !firstLoad && <div className="loading"><p>Loading new location...</p></div>}
        </div>
        <ul>
          {firstLoad ? 'Loading':   
          forecast.forecastday.map(day => {
              return <ForecastDay key={day.date} dayForecast={day}/>
          })}
        </ul>
    </section>
  )
}