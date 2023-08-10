/* 
Question 1: Given a string formatted as keyword = value where each keyword = value pair is on a separate line, write a reusable function that accepts string and a keyword and returns the value of a given keyword.

@param {inputString} The string of data that is line seperated
@param {desiredKeyword} The value you wish to return
@return {string|null} The value associated with desiredKeyword or null if desiredKeyword doesn't exist

*/

function getValueForKeyword(inputString, desiredKeyword) {
  const lines = inputString.split('\n');
  for (const line of lines) {
    const [keyword, value] = line.split('=').map(str => str.trim());
    if (keyword === desiredKeyword) {
      return value;
    }
  }
  return null; // Keyword not found
}

/* 
Question 2: Create a new function that supports similar strings to Question 1 but some have units contained in <>

@param {inputString} The string of data that is line seperated
@param {desiredKeyword} The value you wish to return
@return {string|null} The value associated with desiredKeyword without the units attached or null if the desiredKeyword doesn't exist

*/

function getValueForKeywordWithUnits(inputString, desiredKeyword) {
  const lines = inputString.split('\n');
  for (const line of lines) {
    const [keyword, valueWithUnits] = line.split('=').map(str => str.trim());
    if (keyword === desiredKeyword) {
      const match = valueWithUnits.match(/([\d.-]+)\s*<([^>]+)>/);
      if (match) {
        const value = match[1];
        return value;
      } else {
        return valueWithUnits;
      }
    }
  }
  return null; // Keyword not found
}

/* 
Question 3: Create a new function, class, or script that accepts the same string and keyword input, but now supports unit conversions for those values that have units encoded (e.g., <MS> (milliseconds) to <S> (seconds) or <NM> (nanometers) to <MM> (millimeters)).


Below is a class for converting values with units and performing unit conversions.

*/

class UnitConverter {
  constructor() {
      /* 
      This provides needed info for our units when converting from on to another (if those units are defined below). I also added degC as it was in your units but not your question but doesn't limit anything and allows for more options.
      */
    this.conversions = {
      'MS': { targetUnit: 'seconds', conversionFactor: 0.001 },
      'NM': { targetUnit: 'millimeters', conversionFactor: 0.000001 },
      'DEGC': { targetUnit: 'deg F', conversionFactor: 9/5, offset: 32 },
    };
  }

  convertValue(valueWithUnits) {
      /* 
      changes from one unit to another
      */
    const match = valueWithUnits.match(/([\d.-]+)\s*<([^>]+)>/);
    if (match) {
      const value = parseFloat(match[1]);
      const sourceUnit = match[2];
      if (this.conversions[sourceUnit]) {
        const { targetUnit, conversionFactor, offset } = this.conversions[sourceUnit];
        const convertedValue = (value * conversionFactor) + (offset || 0);
        return `${convertedValue.toFixed(3)} ${targetUnit}`;
      }
    }
    return valueWithUnits;
  }
  /*
Retrieves the converted value for a given keyword from the input string.

@param {string} inputString - The input string containing keyword-value pairs.
@param {string} desiredKeyword - The desired keyword for which the value should be retrieved.
@returns {string|null} The converted value for the desired keyword, or null if the keyword is not found.
   */    
  getValueForKeyword(inputString, desiredKeyword) {
    const lines = inputString.split('\n');
    for (const line of lines) {
      const [keyword, valueWithUnits] = line.split('=').map(str => str.trim());
      if (keyword === desiredKeyword) {
        return this.convertValue(valueWithUnits);
      }
    }
    return null; // Keyword not found
  }
}

/* 
Question 4: Question 3 implimentation with the added funcationality to accept multiple strings, a keyword, and a filter (e.g., maximum) that finds the value of the keyword in each string and then applies the filter. 

Below is a class for converting values with units and performing a filter
*/

class UnitConverterTwo {
    /* 
      This provides needed info for our units when converting from on to another (if those units are defined below). I also added degC as it was in your units but not your question but doesn't limit anything and allows for more options.
    */
  constructor() {
    this.conversions = {
      'MS': { targetUnit: 'seconds', conversionFactor: 0.001 },
      'NM': { targetUnit: 'millimeters', conversionFactor: 0.000001 },
      'DEGC': { targetUnit: 'deg F', conversionFactor: 9/5, offset: 32 },
    };
  }

  convertValue(valueWithUnits) {
      /* 
      changes from one unit to another
      */
    const match = valueWithUnits.match(/([\d.-]+)\s*<([^>]+)>/);
    if (match) {
      const value = parseFloat(match[1]);
      const sourceUnit = match[2];
      if (this.conversions[sourceUnit]) {
        const { targetUnit, conversionFactor, offset } = this.conversions[sourceUnit];
        const convertedValue = (value * conversionFactor) + (offset || 0);
        return convertedValue;
      }
    }
    return parseFloat(valueWithUnits);
  }

  getMaximumValueForKeyword(inputStrings, desiredKeyword) {
/*
@param {string} inputString - The input string containing keyword-value pairs.
@param {string} desiredKeyword - The desired keyword for which the value should be retrieved.
@returns {string|null} The max value for the desired keyword, or null if the keyword is not found.
*/
    let maxValue = -Infinity;

    for (const inputString of inputStrings) {
      const lines = inputString.split('\n');
      for (const line of lines) {
        const [keyword, valueWithUnits] = line.split('=').map(str => str.trim());
        if (keyword === desiredKeyword) {
          const convertedValue = this.convertValue(valueWithUnits);
          if (convertedValue > maxValue) {
            maxValue = convertedValue;
          }
        }
      }
    }

    return maxValue;
  }
}

/*
Question 5: Create a class that accepts multiple strings, a keyword, and a filter or criteria where the filter is an equality using another keyword.

Below is a class for filtering string values and returning those results
*/

class StringFilter {
  constructor(strings) {
    this.strings = strings;
  }
/*
@param {string} keyword - The input string containing keyword-value pairs.
@param {string} filterKeyword - The desired keyword for which the value should be retrieved.
@param {string} filterValue - The desired value to be tested against
@returns {string|null} The converted value for the desired keyword.
*/
  filterByKeywordAndCriteria(keyword, filterKeyword, filterValue) {
    const filteredStrings = this.strings.filter((string) => {
      const lines = string.split('\n');
      let criteriaMatch = false;

      lines.forEach((line) => {
        const [key, value] = line.split('=').map((item) => item.trim());
        if (key === filterKeyword && value == filterValue) {
          criteriaMatch = true;
        }
      });

      if (criteriaMatch) {
        for (const line of lines) {
          const [key, value] = line.split('=').map((item) => item.trim());
          if (key === keyword) {
            return true;
          }
        }
      }
      return false;
    });

    const extractedValues = filteredStrings.map((string) => {
      const lines = string.split('\n');
      for (const line of lines) {
        const [key, value] = line.split('=').map((item) => item.trim());
        if (key === keyword) {
          return value;
        }
      }
    });

    return extractedValues;
  }
}



module.exports = {
    getValueForKeyword,
    getValueForKeywordWithUnits,
    UnitConverter,
    UnitConverterTwo,
    StringFilter
};