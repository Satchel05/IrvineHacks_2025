import { useState, useEffect } from 'react';
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import '../styles/markerStyle.css';
import { Center } from '@chakra-ui/react';

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
                <Center>
                    <CardHeader maxWidth={'md'}>
                            <Heading size="lg">Our Pick</Heading>
                    </CardHeader>
                </Center>
                <CardBody>
                    <Center>
                        <Stack divider={<StackDivider/>}>
                            <Text fontSize="md">Price: ${geminiData.data.house.price}</Text>
                            <Text fontSize="md">Area: {geminiData.data.house.areaLotSF} sq ft.</Text>
                            <Text fontSize="md">Year Built: {geminiData.data.house.yearBuilt}</Text>
                        </Stack>
                    </Center>
                </CardBody>
                <CardFooter>
                    <Text fontSize="sm">{geminiData.data.house.address}</Text>
                </CardFooter>
            </Card>
        </AdvancedMarker>
    )
};

export default PoiMarker;


// add vector map

