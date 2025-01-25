import  { ChakraProvider, Flex, Spacer } from '@chakra-ui/react';
import ChakraForm from './ChakraForm';
import GoogleMaps from './GoogleMaps';

const MapFormWrapper = () => {
    return(
        <Flex>
            <GoogleMaps width={'60vw'}/>
            <ChakraForm width={'40vw'}/>
        </Flex>
    )
};

export default MapFormWrapper;