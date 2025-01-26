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

import { Button } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';

import axios from 'axios';

const ChakraForm = ({width}) => {

    const [text, setText] = useState('');
    const [selection, setSelection] = useState('Single Family Home');


    // useEffect(() => {

    // }, [text])

    // useEffect(() => {

    // }, [selection])

    const handleSubmit = async () => {
        await axios.post('http://localhost:3001/getListings', {
                latitude: await localStorage.getItem('lat'),
                longitude: await localStorage.getItem('lng'),
                radius: 3,
                propertyType: selection,
                resultLimit: 2,
                freeFormAIQuery: "text"
        });

    };
    
    const handleTextAreaChange = (ev) => {
        setText(ev.target.value);
    };

    const handleMenuChange = (ev) => {
        setSelection(ev.target.innerText);
    };

    return(
        <Center w={width}>
            <form onSubmit={handleSubmit}>
                <FormControl p={10}>
                    <FormLabel>Descriptive Paramaters</FormLabel>
                    <Textarea onChange={handleTextAreaChange} placeholder='I need a house that can fit my 16 cats'></Textarea>
                    {/* <FormHelperText>Describe the properties you are interested in</FormHelperText> */}
                </FormControl>
                <FormControl p={10}>
                    <FormLabel>Select Property Type</FormLabel>
                    <Menu onClick={handleMenuChange}>
                        <MenuButton as={Button}>
                            {selection}
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
                    <Button backgroundColor='blue.400' color='white' type="submit">Submit</Button>
                </FormControl>

            </form>
        </Center>
    )
};

export default ChakraForm;