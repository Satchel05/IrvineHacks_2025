import  { ChakraProvider, Flex, Spacer } from '@chakra-ui/react';
import ChakraForm from './ChakraForm';
import GoogleMaps from './GoogleMaps';
import { useState } from 'react';

const MapFormWrapper = () => {

    const [geminiData, setGeminiData] = useState(null);

    return(
        <Flex>
            <GoogleMaps geminiData={geminiData} setGeminiData={setGeminiData} width={'60vw'}/>
            <ChakraForm geminiData={geminiData} setGeminiData={setGeminiData} width={'40vw'}/>
        </Flex>
    )
};

export default MapFormWrapper;