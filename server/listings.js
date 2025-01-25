const dotenv = require('dotenv')
dotenv.config({
    path:'./.env'
})

const xRapidAPIKey = process.env.REALTY_API_KEY;
const returnLimit = 1

async function getListings(latitude, longitude, radius, propertyType) {
    const url = `https://realty-mole-property-api.p.rapidapi.com/saleListings?latitude=${latitude}&longitude=${longitude}&radius=${radius}&propertyType=${propertyType}&status=Active&limit=${returnLimit}`;
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
        let addressList = []
        for (let house of result) {
            addressList.push(house.formattedAddress)
        }
        return addressList
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getListings
};