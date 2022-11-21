import React from "react";
import { useState, useEffect } from "react";
import {useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer} from '@react-google-maps/api';


const containerStyle = {
    width: '700px',
    height: '600px'
  };
  
  const center = {
    // Latitude
    lat: 13.132117, 
    // Longitude  
    lng: 80.241964
  };

  const onLoad = marker => {
    console.log('marker: ', marker)
  }


function Map(){

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey:'AIzaSyAxMFYz4brUdJr1tJRRuHBGksliTemZME4'
        })

        const [map, setMap] = React.useState(null)

        const onLoad = React.useCallback(function callback(map) {
          const bounds = new window.google.maps.LatLngBounds(center);
          map.fitBounds(bounds);
          setMap(map)
        }, [])
      
        const onUnmount = React.useCallback(function callback(map) {
          setMap(null)
        }, [])
      
        return isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={2}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
               {/* <Marker onLoad={onLoad} position={center}/> */}
              <></>
            </GoogleMap>
        ) : <></>
      }


{/* <iframe width="520" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=devarajan%20street%20chennai+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
<a href='https://maps-generator.com/'>Maps Generator</a> */}

export default Map