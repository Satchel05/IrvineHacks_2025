const express = require('express');
const router = express.Router();
const { getListings } = require('./listings.js')

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
        let houses = await getListings(latitude, longitude, radius, propertyType, resultLimit);
        res.json({ success: true, houses: houses, message: 'Retrieval Successful.' });
    }
    catch(err) {
        console.log(err);
        // Return 400 since something wrong with inputs
        res.status(400).json({ success: false, message: 'Error with input fields.' });
    }
})

module.exports = router;