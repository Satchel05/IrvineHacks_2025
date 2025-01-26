const dotenv = require('dotenv')
dotenv.config({
    path:'./.env'
})

const xRapidAPIKey = process.env.REALTY_API_KEY;

async function getListings(latitude, longitude, radius, propertyType, resultLimit) {
    const url = `https://realty-mole-property-api.p.rapidapi.com/saleListings?latitude=${latitude}&longitude=${longitude}&radius=${radius}&propertyType=${propertyType}&status=Active&daysOld=100&limit=${resultLimit}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': xRapidAPIKey,
            'x-rapidapi-host': 'realty-mole-property-api.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let addressDict = {}
        for (let house of result) {
            addressDict[house.formattedAddress] = {
                price: house.price,
                daysOnMarket: house.daysOnMarket,
                listedDate: house.listedDate
            }
        }
        return addressDict
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getListings
};