
import { useState, useCallback } from 'react';
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';


const GoogleMaps = () => {

    const GOOGLE_MAPS_API_KEY="";

    return(
        <>
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                     style={{width: '100vw', height: '100vh'}}
                     defaultCenter={{lat: 33.6405, lng: -117.8389}}
                     defaultZoom={13}
                     gestureHandling={'greedy'}
                     disableDefaultUI={true}>
                </Map>
            </APIProvider>
        </>
    )
};

export default GoogleMaps;