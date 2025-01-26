const express = require('express');
const router = express.Router();
const { getListings } = require('./listings.js')
const { getHousingInfo } = require('./housingInfo.js')

router.post('/getListings', async function(req, res) {
    try {
        // Extract user input from body
        let { latitude, longitude, radius, propertyType, resultLimit, freeFormAIQuery} = req.body;
        console.log(latitude, longitude, radius, propertyType, resultLimit, freeFormAIQuery);
        // Ensure all user input is defined
        if (latitude === undefined || longitude === undefined || radius === undefined ||  propertyType === undefined || resultLimit === undefined || freeFormAIQuery === undefined) {
            res.status(400).json({ success: false, message: 'Error with input fields.' });
            return;
        }
        // Get houses listed for sale
        
        // Remove hardcoded when ready
        housesDict = await getListings(latitude, longitude, radius, propertyType, resultLimit);
        // houses = ["22701 Malaga Way, Lake Forest, CA 92630", "8792 Midbury Drive, Huntington Beach, CA 92646"]
        // houses = ["11910 212th St, Lakewood, CA 90715", "11721 Montecito Rd, Los Alamitos, CA 90720", "6392 Cornell Dr, Huntington Beach, CA 92647", 
        //     "8772 Midbury Dr", "2 Fuertes, Irvine, CA 92617"]
        
        // Remove hardcoded when ready
        houseInfos = await getHousingInfo(Object.keys(housesDict));
        // houseInfos = {
        //     "Version": "8.4.2.1082",
        //     "TransmissionReference": "LookupProperty POST Test",
        //     "TransmissionResults": "",
        //     "TotalRecords": 2,
        //     "Records": [
        //         {
        //             "RecordID": "1",
        //             "Results": "YS02,YS07,YC01,GS05",
        //             "Parcel": {
        //                 "FIPSCode": "06059",
        //                 "UnformattedAPN": "933-430-64",
        //                 "FormattedAPN": "93343064"
        //             },
        //             "Legal": {},
        //             "PropertyAddress": {
        //                 "Address": "22701 Malaga Way",
        //                 "City": "Lake Forest",
        //                 "State": "CA",
        //                 "Zip": "92630-4630",
        //                 "CarrierRoute": "C034",
        //                 "AddressKey": "92630463001",
        //                 "MAK": "3714352679",
        //                 "BaseMAK": "",
        //                 "Latitude": "33.632086",
        //                 "Longitude": "-117.687459",
        //                 "PrivacyInfo": ""
        //             },
        //             "ParsedPropertyAddress": {},
        //             "PrimaryOwner": {
        //                 "Name1Full": "Jose De Jesus Orozco"
        //             },
        //             "SecondaryOwner": {},
        //             "OwnerAddress": {},
        //             "LastDeedOwnerInfo": {},
        //             "CurrentDeed": {
        //                 "MortgageAmount": "116400",
        //                 "MortgageDate": "20000414",
        //                 "MortgageDueDate": "20300501",
        //                 "LenderName": "GUILD MORTGAGE COMPANY"
        //             },
        //             "Tax": {
        //                 "AssessedValueTotal": "269097",
        //                 "MarketValueTotal": "0",
        //                 "TaxFiscalYear": "2024",
        //                 "TaxBilledAmount": "2835.92"
        //             },
        //             "PropertyUseInfo": {
        //                 "YearBuilt": "1974"
        //             },
        //             "SaleInfo": {
        //                 "AssessorLastSaleDate": "20070507",
        //                 "AssessorLastSaleAmount": "0",
        //                 "AssessorPriorSaleDate": "",
        //                 "AssessorPriorSaleAmount": "0",
        //                 "DeedLastSaleDate": "20000414",
        //                 "DeedLastSalePrice": "120000"
        //             },
        //             "PropertySize": {
        //                 "AreaBuilding": "873",
        //                 "AreaLotAcres": "0.0000",
        //                 "AreaLotSF": "0.00"
        //             },
        //             "Pool": {
        //                 "Pool": "",
        //                 "PoolArea": "0",
        //                 "SaunaFlag": ""
        //             },
        //             "IntStructInfo": {
        //                 "Foundation": "",
        //                 "Construction": "",
        //                 "InteriorStructure": "",
        //                 "PlumbingFixturesCount": "0",
        //                 "ConstructionFireResistanceClass": "",
        //                 "SafetyFireSprinklersFlag": "",
        //                 "FlooringMaterialPrimary": ""
        //             },
        //             "IntRoomInfo": {
        //                 "BathCount": "1",
        //                 "BathPartialCount": "0",
        //                 "BedroomsCount": "2",
        //                 "RoomsCount": "5",
        //                 "StoriesCount": "1",
        //                 "UnitsCount": "0",
        //                 "BonusRoomFlag": "",
        //                 "BreakfastNookFlag": "",
        //                 "CellarFlag": "",
        //                 "CellarWineFlag": "",
        //                 "ExcerciseFlag": "",
        //                 "FamilyCode": "",
        //                 "GameFlag": "",
        //                 "GreatFlag": "",
        //                 "HobbyFlag": "",
        //                 "LaundryFlag": "",
        //                 "MediaFlag": "",
        //                 "MudFlag": "",
        //                 "OfficeArea": "0",
        //                 "OfficeFlag": "",
        //                 "SafeRoomFlag": "",
        //                 "SittingFlag": "",
        //                 "StormShelter": "",
        //                 "StudyFlag": "",
        //                 "SunroomFlag": "",
        //                 "UtilityArea": "0",
        //                 "UtilityCode": ""
        //             },
        //             "IntAmenities": {},
        //             "ExtStructInfo": {
        //                 "StructureStyle": "",
        //                 "Exterior1Code": "",
        //                 "RoofMaterial": "",
        //                 "RoofConstruction": "",
        //                 "StormShutterFlag": "",
        //                 "OverheadDoorFlag": ""
        //             },
        //             "ExtAmenities": {
        //                 "ViewDescription": "",
        //                 "PorchCode": "",
        //                 "PorchArea": "0",
        //                 "PatioArea": "0",
        //                 "DeckFlag": "",
        //                 "DeckArea": "0",
        //                 "FeatureBalconyFlag": "",
        //                 "BalconyArea": "0",
        //                 "BreezewayFlag": ""
        //             },
        //             "ExtBuildings": {
        //                 "BuildingsCount": "0",
        //                 "BathHouseArea": "0",
        //                 "BathHouseFlag": "",
        //                 "BoatAccessFlag": "",
        //                 "BoatHouseArea": "0",
        //                 "BoatHouseFlag": "",
        //                 "CabinArea": "0",
        //                 "CabinFlag": "",
        //                 "CanopyArea": "0",
        //                 "CanopyFlag": "",
        //                 "GazeboArea": "0",
        //                 "GazeboFlag": "",
        //                 "GranaryArea": "0",
        //                 "GranaryFlag": "",
        //                 "GreenHouseArea": "0",
        //                 "GreenHouseFlag": "",
        //                 "GuestHouseArea": "0",
        //                 "GuestHouseFlag": "",
        //                 "KennelArea": "0",
        //                 "KennelFlag": "",
        //                 "LeanToArea": "0",
        //                 "LeanToFlag": "",
        //                 "LoadingPlatformArea": "0",
        //                 "LoadingPlatformFlag": "",
        //                 "MilkHouseArea": "0",
        //                 "MilkHouseFlag": "",
        //                 "OutdoorKitchenFireplaceFlag": "",
        //                 "PoolHouseArea": "0",
        //                 "PoolHouseFlag": "",
        //                 "PoultryHouseArea": "0",
        //                 "PoultryHouseFlag": "",
        //                 "QuonsetArea": "0",
        //                 "QuonsetFlag": "",
        //                 "ShedArea": "0",
        //                 "ShedCode": "",
        //                 "SiloArea": "0",
        //                 "SiloFlag": "",
        //                 "StableArea": "0",
        //                 "StableFlag": "",
        //                 "StorageBuildingArea": "0",
        //                 "StorageBuildingFlag": "",
        //                 "UtilityBuildingArea": "0",
        //                 "UtilityBuildingFlag": "",
        //                 "PoleStructureArea": "0",
        //                 "PoleStructureFlag": ""
        //             },
        //             "Utilities": {},
        //             "Parking": {
        //                 "RVParkingFlag": "",
        //                 "ParkingSpaceCount": "1",
        //                 "DrivewayArea": "0",
        //                 "DrivewayMaterial": ""
        //             },
        //             "YardGardenInfo": {},
        //             "EstimatedValue": {
        //                 "EstimatedValue": "534000",
        //                 "EstimatedMinValue": "491280",
        //                 "EstimatedMaxValue": "576720",
        //                 "ConfidenceScore": "92",
        //                 "ValuationDate": "20241218"
        //             },
        //             "Shape": {}
        //         },
        //         {
        //             "RecordID": "2",
        //             "Results": "YS02,YS07,YC01,GS05",
        //             "Parcel": {
        //                 "FIPSCode": "06059",
        //                 "UnformattedAPN": "151-541-10",
        //                 "FormattedAPN": "15154110"
        //             },
        //             "Legal": {},
        //             "PropertyAddress": {
        //                 "Address": "8792 Midbury Dr",
        //                 "City": "Huntington Beach",
        //                 "State": "CA",
        //                 "Zip": "92646-4642",
        //                 "CarrierRoute": "C059",
        //                 "AddressKey": "92646464292",
        //                 "MAK": "2387036493",
        //                 "BaseMAK": "",
        //                 "Latitude": "33.669796",
        //                 "Longitude": "-117.974607",
        //                 "PrivacyInfo": ""
        //             },
        //             "ParsedPropertyAddress": {},
        //             "PrimaryOwner": {
        //                 "Name1Full": "Ronald B Eatherton"
        //             },
        //             "SecondaryOwner": {},
        //             "OwnerAddress": {},
        //             "LastDeedOwnerInfo": {},
        //             "CurrentDeed": {
        //                 "MortgageAmount": "",
        //                 "MortgageDate": "",
        //                 "MortgageDueDate": "",
        //                 "LenderName": ""
        //             },
        //             "Tax": {
        //                 "AssessedValueTotal": "98104",
        //                 "MarketValueTotal": "0",
        //                 "TaxFiscalYear": "2024",
        //                 "TaxBilledAmount": "1473.46"
        //             },
        //             "PropertyUseInfo": {
        //                 "YearBuilt": "1975"
        //             },
        //             "SaleInfo": {
        //                 "AssessorLastSaleDate": "",
        //                 "AssessorLastSaleAmount": "0",
        //                 "AssessorPriorSaleDate": "",
        //                 "AssessorPriorSaleAmount": "0",
        //                 "DeedLastSaleDate": "",
        //                 "DeedLastSalePrice": ""
        //             },
        //             "PropertySize": {
        //                 "AreaBuilding": "1698",
        //                 "AreaLotAcres": "0.1380",
        //                 "AreaLotSF": "6000.00"
        //             },
        //             "Pool": {
        //                 "Pool": "",
        //                 "PoolArea": "0",
        //                 "SaunaFlag": ""
        //             },
        //             "IntStructInfo": {
        //                 "Foundation": "",
        //                 "Construction": "",
        //                 "InteriorStructure": "",
        //                 "PlumbingFixturesCount": "0",
        //                 "ConstructionFireResistanceClass": "",
        //                 "SafetyFireSprinklersFlag": "",
        //                 "FlooringMaterialPrimary": ""
        //             },
        //             "IntRoomInfo": {
        //                 "BathCount": "2",
        //                 "BathPartialCount": "1",
        //                 "BedroomsCount": "4",
        //                 "RoomsCount": "7",
        //                 "StoriesCount": "2",
        //                 "UnitsCount": "0",
        //                 "BonusRoomFlag": "",
        //                 "BreakfastNookFlag": "",
        //                 "CellarFlag": "",
        //                 "CellarWineFlag": "",
        //                 "ExcerciseFlag": "",
        //                 "FamilyCode": "",
        //                 "GameFlag": "",
        //                 "GreatFlag": "",
        //                 "HobbyFlag": "",
        //                 "LaundryFlag": "",
        //                 "MediaFlag": "",
        //                 "MudFlag": "",
        //                 "OfficeArea": "0",
        //                 "OfficeFlag": "",
        //                 "SafeRoomFlag": "",
        //                 "SittingFlag": "",
        //                 "StormShelter": "",
        //                 "StudyFlag": "",
        //                 "SunroomFlag": "",
        //                 "UtilityArea": "0",
        //                 "UtilityCode": ""
        //             },
        //             "IntAmenities": {},
        //             "ExtStructInfo": {
        //                 "StructureStyle": "",
        //                 "Exterior1Code": "",
        //                 "RoofMaterial": "",
        //                 "RoofConstruction": "",
        //                 "StormShutterFlag": "",
        //                 "OverheadDoorFlag": ""
        //             },
        //             "ExtAmenities": {
        //                 "ViewDescription": "",
        //                 "PorchCode": "",
        //                 "PorchArea": "0",
        //                 "PatioArea": "0",
        //                 "DeckFlag": "",
        //                 "DeckArea": "0",
        //                 "FeatureBalconyFlag": "",
        //                 "BalconyArea": "0",
        //                 "BreezewayFlag": ""
        //             },
        //             "ExtBuildings": {
        //                 "BuildingsCount": "0",
        //                 "BathHouseArea": "0",
        //                 "BathHouseFlag": "",
        //                 "BoatAccessFlag": "",
        //                 "BoatHouseArea": "0",
        //                 "BoatHouseFlag": "",
        //                 "CabinArea": "0",
        //                 "CabinFlag": "",
        //                 "CanopyArea": "0",
        //                 "CanopyFlag": "",
        //                 "GazeboArea": "0",
        //                 "GazeboFlag": "",
        //                 "GranaryArea": "0",
        //                 "GranaryFlag": "",
        //                 "GreenHouseArea": "0",
        //                 "GreenHouseFlag": "",
        //                 "GuestHouseArea": "0",
        //                 "GuestHouseFlag": "",
        //                 "KennelArea": "0",
        //                 "KennelFlag": "",
        //                 "LeanToArea": "0",
        //                 "LeanToFlag": "",
        //                 "LoadingPlatformArea": "0",
        //                 "LoadingPlatformFlag": "",
        //                 "MilkHouseArea": "0",
        //                 "MilkHouseFlag": "",
        //                 "OutdoorKitchenFireplaceFlag": "",
        //                 "PoolHouseArea": "0",
        //                 "PoolHouseFlag": "",
        //                 "PoultryHouseArea": "0",
        //                 "PoultryHouseFlag": "",
        //                 "QuonsetArea": "0",
        //                 "QuonsetFlag": "",
        //                 "ShedArea": "0",
        //                 "ShedCode": "",
        //                 "SiloArea": "0",
        //                 "SiloFlag": "",
        //                 "StableArea": "0",
        //                 "StableFlag": "",
        //                 "StorageBuildingArea": "0",
        //                 "StorageBuildingFlag": "",
        //                 "UtilityBuildingArea": "0",
        //                 "UtilityBuildingFlag": "",
        //                 "PoleStructureArea": "0",
        //                 "PoleStructureFlag": ""
        //             },
        //             "Utilities": {},
        //             "Parking": {
        //                 "RVParkingFlag": "",
        //                 "ParkingSpaceCount": "2",
        //                 "DrivewayArea": "0",
        //                 "DrivewayMaterial": ""
        //             },
        //             "YardGardenInfo": {},
        //             "EstimatedValue": {
        //                 "EstimatedValue": "1398000",
        //                 "EstimatedMinValue": "1216260",
        //                 "EstimatedMaxValue": "1579740",
        //                 "ConfidenceScore": "87",
        //                 "ValuationDate": "20241218"
        //             },
        //             "Shape": {}
        //         }
        //     ]
        // }
        res.json({ success: true, housesInfo: houseInfos, message: 'Retrieval Successful.' });
    }
    catch(err) {
        console.log(err);
        // Return 400 since something wrong with inputs
        res.status(400).json({ success: false, message: 'Error with input fields.' });
    }
})

module.exports = router;