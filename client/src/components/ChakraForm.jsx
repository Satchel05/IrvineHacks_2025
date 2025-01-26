import { useState, useEffect } from 'react';
import {FormControl,FormLabel,FormErrorMessage, FormHelperText, Textarea} from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'

import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react'

import { Button } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';

import axios from 'axios';

const ChakraForm = ({width, geminiData, setGeminiData}) => {

    const [text, setText] = useState('');
    const [menuSelection, setMenuSelection] = useState('Single Family Home');
    const [sliderSelection, setSliderSelection] = useState(1);

    // useEffect(() => {
    //     localStorage.setItem('geminiData', geminiData);
    // }, [geminiData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post('http://localhost:3001/getListings', {
                latitude: localStorage.getItem('lat'),
                longitude: localStorage.getItem('lng'),
                radius: sliderSelection,
                propertyType: menuSelection,
                resultLimit: 1,
                freeFormAIQuery: text
        });

        console.log(data);

        localStorage.setItem("gemini", data.data.house.address);

        setGeminiData(data);

    };
    
    const handleTextAreaChange = (ev) => {
        setText(ev.target.value);
    };

    const handleMenuChange = (ev) => {
        setMenuSelection(ev.target.innerText);
    };

    const handleSliderChange = (ev) => {
        setSliderSelection(ev);
    };

    return(
        <Center w={width}>
            <form onSubmit={handleSubmit}>
                <FormControl p={10}>
                    <FormLabel fontSize="xl">Descriptive Paramaters</FormLabel>
                    <Textarea onChange={handleTextAreaChange} placeholder='I need a house that can fit my 16 cats'></Textarea>
                    {/* <FormHelperText>Describe the properties you are interested in</FormHelperText> */}
                </FormControl>
                <FormControl p={10}>
                    <FormLabel fontSize="xl">Select Property Type</FormLabel>
                    <Menu onClick={handleMenuChange}>
                        <MenuButton as={Button}>
                            {menuSelection}
                        </MenuButton>
                        <MenuList>
                            {/* Set padding constant */}
                            <MenuItem onClick={handleMenuChange}>Single Family</MenuItem>
                            <MenuItem onClick={handleMenuChange}>Condo</MenuItem>
                            <MenuItem onClick={handleMenuChange}>Townhouse</MenuItem>
                            <MenuItem onClick={handleMenuChange}>Manufactured</MenuItem>
                            <MenuItem onClick={handleMenuChange}>Duplex-Triplex</MenuItem>
                            <MenuItem onClick={handleMenuChange}>Apartment</MenuItem>
                            <MenuItem onClick={handleMenuChange}>Land</MenuItem>
                        </MenuList>
                    </Menu>
                    <FormHelperText>Select the type of property you are interested in</FormHelperText>
                </FormControl>
                <FormControl p={10}>
                    <FormLabel fontSize="xl">Search Range</FormLabel>
                        <Slider onChangeEnd={handleSliderChange} defaultValue={3} min={1} max={5} step={1}>
                            <SliderMark value={1} mt="2">1</SliderMark>
                            <SliderMark value={2} mt="2">2</SliderMark>
                            <SliderMark value={3} mt="2">3</SliderMark>
                            <SliderMark value={4} mt="2">4</SliderMark>
                            <SliderMark value={5} mt="2">5</SliderMark>
                            <SliderTrack bg="blue.100">
                                <SliderFilledTrack bg="blue.400"></SliderFilledTrack>
                            </SliderTrack>
                            <SliderThumb boxSize={4}></SliderThumb>
                        </Slider>
                    {/* <FormHelperText></FormHelperText> */}
                </FormControl>
                <FormControl p={10}>
                    <Button backgroundColor='blue.400' color='white' type="submit">Submit</Button>
                </FormControl>

            </form>
        </Center>
    )
};

export default ChakraForm;