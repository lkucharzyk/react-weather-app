import { useEffect} from 'react';
import { ForecastDay } from './ForecastDay';

export const ForecastDaily = ({forecast, dailyForecastExpanded, toggleExpand}) => {
  return (
    <section className={`main-module ${!dailyForecastExpanded && 'rolled'}`}>
        <div className='header' onClick={toggleExpand}>
            <h2>Daily Forecast</h2><i class="fa-solid fa-angle-down"></i>
        </div>
        <ul>
            {forecast.forecastday.map(day => {
                return <ForecastDay dayForecast={day}/>
            })}
        </ul>
    </section>
  )
}