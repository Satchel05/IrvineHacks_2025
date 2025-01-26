const axios = require('axios');
const dotenv = require('dotenv');

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

    const addressFound = (record) => {
        return !record.Results.includes("YE");
    }
    console.log(response.data.Records);
    records = response.data.Records
    records = records.filter(addressFound)
    return records
};

async function getSpecificHouseInfo(houseID, records, listings) {
    let house = undefined;
    let saleInfo = undefined;
    for (let record of records) {
        if (houseID == record.PropertyAddress.MAK) {
            house = record;
            break;
        }
    }
    console.log("boom");
    for (address of Object.values(listings)) {
        console.log(listings)
        console.log(house.PropertyAddress.Latitude - address.Latitude)
        console.log(house.PropertyAddress.Longitude - address.Longitude)
        if (Math.abs(house.PropertyAddress.Latitude - address.Latitude) <= 0.001 && Math.abs(house.PropertyAddress.Longitude - address.Longitude) <= 0.001) {
            console.log("I am here")
            saleInfo = address;
            break;
        }
    }
    console.log(saleInfo)
    return {
        address: house.PropertyAddress.Address + ", " + house.PropertyAddress.City + ", " + house.PropertyAddress.State + " " + house.PropertyAddress.Zip,
        daysOnMarket: saleInfo.daysOnMarket,
        listedDate: saleInfo.listedDate,
        yearBuilt: house.PropertyUseInfo.YearBuilt,
        deedLastSaleDate: house.SaleInfo.DeedLastSaleDate,
        deedLastSalePrice: house.SaleInfo.DeedLastSalePrice,
        areaLotSF: house.PropertySize.AreaLotSF,
        parkingGarage: house.PropertySize.ParkingGarage,
        parkingGarageArea: house.PropertySize.ParkingGarageArea,
        pool: house.Pool.Pool,
        poolArea: house.Pool.PoolArea,
        intRoomInfo: house.IntRoomInfo,
        intAmenities: house.IntAmenities,
        extAmenities: house.ExtAmenities,
        parkingSpaceCount: house.Parking.ParkingSpaceCount,
        estimatedValue: house.EstimatedValue,
        latitude: house.PropertyAddress.Latitude,
        longitude: house.PropertyAddress.Longitude,
        price: saleInfo.price
    }
}


module.exports = {
    getHousingInfo,
    getSpecificHouseInfo
};