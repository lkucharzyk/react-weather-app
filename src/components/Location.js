import React, { useEffect } from 'react';
import { Map, Marker } from "pigeon-maps"


export const Location = ({location, changeLocation, markerAnchor, changeMarkerAnchor}) => {
 // useEffect(()=> console.log(markerAnchor))

  const mapOnClick = e =>{
    changeMarkerAnchor(e.latLng);
    changeLocation(e.latLng.join(','))
  }
  
  return (
    
    <section className='main-module'>
      <h2>{location.name}</h2>
      <p>Click on map to change location</p>
      <Map height={300} defaultCenter={markerAnchor} defaultZoom={10}  onClick={mapOnClick}>
        <Marker width={50} anchor={markerAnchor} />
      </Map>
    </section>
  )
  
}
