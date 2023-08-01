import { useEffect} from 'react';
import { ForecastDay } from './ForecastDay';

export const ForecastDaily = ({forecast, dailyForecastExpanded, loading, firstLoad, toggleExpand}) => {
  return (
    <section className={`main-module ${!dailyForecastExpanded && 'rolled'}`}>
        <div className='header' onClick={toggleExpand}>
            <h2>Daily Forecast</h2><i class="fa-solid fa-angle-down"></i>
        </div>
        {loading && !firstLoad && <div className="loading"><p>Loading new location...</p></div>}
        <ul>
          {firstLoad ? 'Loading':   
          forecast.forecastday.map(day => {
              return <ForecastDay key={day.date} dayForecast={day}/>
          })}
        </ul>
    </section>
  )
}