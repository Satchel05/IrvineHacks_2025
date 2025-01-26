import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useState } from 'react';
import '../styles/markerStyle.css';

const PoiMarker = ({location}) => {

    const [className, setClassName] = useState('intial');

    const handleOnMouseEnter = () => {
        console.log("hover")
        setClassName('hover');
    };

    return(
        <AdvancedMarker onMouseEnter={handleOnMouseEnter} key="myCustomMarker" position={{lat: location.lat, lng: location.lng}}>
            <Pin glyphColor={'#000'} borderColor={'#000'} className={className} />
        </AdvancedMarker>
    )
};

export default PoiMarker;


// add vector map

