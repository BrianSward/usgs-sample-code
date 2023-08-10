const { getValueForKeyword, getValueForKeywordWithUnits, UnitConverter, UnitConverterTwo, StringFilter } = require('./index');

// Test getValueForKeyword function
const inputString1 = `
    INSTRUMENT_ID = "MDIS-NAC"
    EXPOSURE_DURATION = 192
    DETECTOR_TEMPERATURE = -42.55
    FILTER_TEMPERATURE = "N/A"`;
const desiredKeyword1 = "EXPOSURE_DURATION";
console.log("getValueForKeyword:", getValueForKeyword(inputString1, desiredKeyword1));

// Test getValueForKeywordWithUnits function
const inputString2 = `
    INSTRUMENT_ID = "MDIS-NAC"
    EXPOSURE_DURATION = 192 <MS>
    DETECTOR_TEMPERATURE = -42.55
    FILTER_TEMPERATURE = "N/A"`;
const desiredKeyword2 = "EXPOSURE_DURATION";
console.log("getValueForKeywordWithUnits:", getValueForKeywordWithUnits(inputString2, desiredKeyword2));

// Test UnitConverter class
const unitConverter = new UnitConverter();
console.log("UnitConverter:", unitConverter.convertValue("192 <MS>"));

// Test UnitConverterTwo class
const unitConverterTwo = new UnitConverterTwo();
console.log("UnitConverterTwo:", unitConverterTwo.getMaximumValueForKeyword([inputString1, inputString2], "EXPOSURE_DURATION"));

// Test StringFilter class
const inputStrings = [
    `INSTRUMENT_ID = "MDIS-NAC"
    FILTER_NUMBER = 2
    EXPOSURE_DURATION = 192`
    ,
    `INSTRUMENT_ID = "MDIS-NAC"
    FILTER_NUMBER = 5
    EXPOSURE_DURATION = 150`
    ,
    `INSTRUMENT_ID = "MDIS-NAC"
    FILTER_NUMBER = 2
    EXPOSURE_DURATION = 209`
];
const stringFilter = new StringFilter(inputStrings);
console.log("StringFilter:", stringFilter.filterByKeywordAndCriteria("EXPOSURE_DURATION", "FILTER_NUMBER", "2"));