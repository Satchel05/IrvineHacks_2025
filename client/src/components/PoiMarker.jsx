import { useState, useEffect } from 'react';
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import '../styles/markerStyle.css';

// to move to seperate component
import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Stack, StackDivider } from '@chakra-ui/react';

const PoiMarker = ({location, geminiData, setGeminiData}) => {

    const handleOnMouseEnter = () => {
        console.log("hover")
        // setClassName('hover');
    };

    useEffect(() => {
        console.log(geminiData);
    }, [geminiData])

    return(
        !geminiData ? ( 
        <AdvancedMarker onMouseEnter={handleOnMouseEnter} key="myCustomMarker" position={{lat: location.lat, lng: location.lng}}>
        </AdvancedMarker>) 
        
        :

        <AdvancedMarker onMouseEnter={handleOnMouseEnter} key="myCustomMarker" position={{lat: parseFloat(geminiData.data.house.latitude), lng: parseFloat(geminiData.data.house.longitude)}}>
            <Card>
                <CardHeader>
                    <Heading size="lg">Data</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider/>}>
                        <Text>{geminiData.data.house.address}</Text>
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

