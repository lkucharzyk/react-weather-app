import React, { useEffect } from 'react';
import { Map, Marker } from "pigeon-maps"


export const Location = ({currentWeather, changeLocation, loading, firstLoad, noLocationData, markerAnchor, changeMarkerAnchor}) => {

  const mapOnClick = e =>{
    changeMarkerAnchor(e.latLng);
    changeLocation(e.latLng.join(','))
  }
  
  

  
  return (
    <>
    <section className='main-module' style={{zIndex: '999', position: 'relative'}}>
      <h2>{ firstLoad ? 'Loading...' : currentWeather.location.name}</h2>
      <div className="loading-wraper">
        {loading && !firstLoad && <div className="loading"><p>Loading new location...</p></div>}
        {noLocationData && <div className="error"><i class="fa-solid fa-triangle-exclamation"></i><p>Sorry, no data for selected location. Please chose another on map.</p></div>}
      </div>
      <p>Click on map to change location</p>
      <div className="map-container">
        <Map height={300} defaultCenter={markerAnchor} defaultZoom={4}  onClick={mapOnClick}>
          <Marker width={50} anchor={markerAnchor} />
        </Map>
      </div>
    </section>
    {noLocationData &&  <div className="overlay"></div>}
    </>
  )

  
}
