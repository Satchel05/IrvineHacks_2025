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
    console.log(response);
    console.log(response.data);
    console.log(response.data.Records);
    records = response.data.Records
    records = records.filter(addressFound)
    console.log(records);
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
    for (address of Object.keys(listings)) {
        if (address.includes(house.PropertyAddress.Address)) {
            saleInfo = listings[address];
            break;
        }
    }
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
        estimatedValue: house.EstimatedValue
    }
}


module.exports = {
    getHousingInfo,
    getSpecificHouseInfo
};