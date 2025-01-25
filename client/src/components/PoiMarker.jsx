import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const PoiMarker = ({location}) => {
    return(
        <AdvancedMarker key="myCustomMarker" position={{lat: location.lat, lng: location.lng}}>
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
    )
};

export default PoiMarker;


// add vector map

