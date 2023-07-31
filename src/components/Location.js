import React, { useEffect } from 'react';
import { Map, Marker } from "pigeon-maps"


export const Location = ({location, changeLocation, markerAnchor, changeMarkerAnchor}) => {
  useEffect(()=> console.log(markerAnchor))

  const mapOnClick = e =>{
    changeLocation(e.latLng.join(','))
    changeMarkerAnchor(e.latLng);
  }
  
  return (
    
    <section className='main-module'>
      <h2>{location.name}</h2>
      <p>{markerAnchor}</p>
      <Map height={300} defaultCenter={markerAnchor} defaultZoom={11}  onClick={mapOnClick}>
        <Marker width={50} anchor={markerAnchor} />
      </Map>
    </section>
  )
  
}
