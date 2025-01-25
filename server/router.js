const express = require('express');
const router = express.Router();
const { getListings } = require('./listings.js')
const { getHousingInfo } = require('./housingInfo.js')

router.get('/getListings', async function(req, res) {
    try {
        // Extract user input from body
        let { latitude, longitude, radius, propertyType, resultLimit, freeformAIQuery} = req.body;
        console.log(latitude, longitude, radius, propertyType, resultLimit, freeformAIQuery);
        // Ensure all user input is defined
        if (latitude === undefined || longitude === undefined || radius === undefined ||  propertyType === undefined || resultLimit === undefined || freeformAIQuery === undefined) {
            res.status(400).json({ success: false, message: 'Error with input fields.' });
            return;
        }
        // Get houses listed for sale
        
        // Remove hardcoded when ready
        // houses = await getListings(latitude, longitude, radius, propertyType, resultLimit);
        houses = ["22701 Malaga Way, Lake Forest, CA 92630"]
        houseInfos = await getHousingInfo(houses);
        res.json({ success: true, housesInfo: houseInfos, message: 'Retrieval Successful.' });
    }
    catch(err) {
        console.log(err);
        // Return 400 since something wrong with inputs
        res.status(400).json({ success: false, message: 'Error with input fields.' });
    }
})

module.exports = router;