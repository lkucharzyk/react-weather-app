import React, { useEffect } from 'react';
import { Map, Marker } from "pigeon-maps"


export const Location = ({currentWeather, changeLocation, loading, firstLoad, markerAnchor, changeMarkerAnchor}) => {

  const mapOnClick = e =>{
    changeMarkerAnchor(e.latLng);
    changeLocation(e.latLng.join(','))
  }
  
  

  
  return (
    
    <section className='main-module'>
      <h2>{ firstLoad ? 'Loading...' : currentWeather.location.name}</h2>
      {loading && !firstLoad && <div className="loading"><p>Loading new location...</p></div>}
      <p>Click on map to change location</p>
      <div className="map-container">
        <Map height={300} defaultCenter={markerAnchor} defaultZoom={4}  onClick={mapOnClick}>
          <Marker width={50} anchor={markerAnchor} />
        </Map>
      </div>
    </section>
  )

  
}
