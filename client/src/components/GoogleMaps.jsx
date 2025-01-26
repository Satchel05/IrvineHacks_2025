
import { useState, useCallback } from 'react';
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import PoiMarker from './PoiMarker';

const GoogleMaps = ({ width }) => {

    const GOOGLE_MAPS_API_KEY = 'AIzaSyBC5n5d-JuNq1lETmrm99-3nYaXw5hngTM';
    const MAP_ID = '58d731dad8131c67';

    const [coords, setCoords] = useState({lat: 33.6405, lng: -117.8389});
    const [circleCenter, setCircleCenter] = useState({lat: 33.6405, lng: -117.8389})

    const handleClick = (ev) => {
        setCoords({lat: ev.detail.latLng.lat, lng: ev.detail.latLng.lng})
        setCircleCenter({lat: ev.detail.latLng.lat, lng: ev.detail.latLng.lng})
        // dump to local storage
        localStorage.setItem('lat', ev.detail.latLng.lat);
        localStorage.setItem('lng', ev.detail.latLng.lng);

    };

    return(
        <>
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                     style={{width: width, height: '100vh'}}
                     defaultCenter={{lat: 33.6405, lng: -117.8389}}
                     mapId={MAP_ID}
                     onClick={handleClick}
                     defaultZoom={13}
                     gestureHandling={'greedy'}
                     disableDefaultUI={true}
                >
                    <PoiMarker location={{lat: coords.lat, lng: coords.lng}}/>
                </Map>
                {/* <Circle map={}/> */}
            </APIProvider>
        </>
    )
};

export default GoogleMaps;