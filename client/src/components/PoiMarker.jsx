import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useState } from 'react';
import '../styles/markerStyle.css';

// to move to seperate component
import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Stack, StackDivider } from '@chakra-ui/react';

const PoiMarker = ({location}) => {

    const [className, setClassName] = useState('hover');

    const handleOnMouseEnter = () => {
        console.log("hover")
        // setClassName('hover');
    };

    return(
        <AdvancedMarker onMouseEnter={handleOnMouseEnter} key="myCustomMarker" position={{lat: location.lat, lng: location.lng}}>
            <Card>
                <CardHeader>
                    <Heading size="lg">Data</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider/>}>
                        <Text>Data 1</Text>
                        <Text>Data 2</Text>
                        <Text>Data 3</Text>
                    </Stack>
                </CardBody>
            </Card>
        </AdvancedMarker>
    )
};

export default PoiMarker;


// add vector map

