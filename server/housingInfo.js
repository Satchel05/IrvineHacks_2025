const axios = require('axios');
const dotenv = require('dotenv')
dotenv.config({
    path:'./.env'
})

const melissaAPIKey = process.env.MELISSA_API_KEY;

async function getHousingInfo(houses) {
    recordList = []
    i = 1
    for (let address of houses) {
        recordList.push({
            RecordID: i,
            AddressLine1: "",
            AddressLine2: "",
            City: "",
            State: "",
            PostalCode: "",
            MAK: "",
            FIPS: "",
            APN: "",
            FreeForm: address
        })
        i += 1;
    }
    console.log(recordList)
    // Prepare the payload
    const payload = {
      TransmissionReference: "LookupProperty POST Test",
      CustomerId: melissaAPIKey,
      TotalRecords: houses.length,
      Columns: "GrpPropertyAddress,\
      GrpPropertySize,GrpPool,GrpIntStructInfo,GrpIntRoomInfo,\
      GrpIntAmenities,GrpExtStructInfo,GrpExtAmenities,GrpExtBuildings,\
      GrpUtilities,GrpParking,GrpEstimatedValue",
      Records: recordList
    };
  
    // Send the POST request
    const response = await axios.post(
        'https://property.melissadata.net/v4/WEB/LookupProperty',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
    );
    console.log('API response:', response.data);
    return response.data
};

module.exports = {
    getHousingInfo
};