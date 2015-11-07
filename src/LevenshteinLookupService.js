var data = [];
var MINIMUM_INPUT_LENGTH = 3;
var MAXIMUM_RESULT_COUNT = 7;

export default {
  setData: function(data_) {
    data = normalizeData(data_);
  },
  getMatches: function(input) {
    return lookup(input);
  }
}

function normalizeData (data) {
  data.forEach(normalizePerson);
  return data;
}

function normalizePerson (person) {
  person.normalizedName = normalizeName(person.name);
  person.normalizedPhone = person.phone.map(normalizePhoneNumber);
}

function normalizeName (nam) {
  if (nam === undefined) {
    return '';
  }

  // lowercase, characters only, sort words alphabetically
  nam = nam.trim().toLowerCase().replace(/[^a-zäöüß\ ]/g, '');
  return nam;
}

function normalizePhoneNumber (phoneNumber) {
  if (phoneNumber === undefined) {
    return '';
  }

  // replace country code with a zero
  if (phoneNumber[0] === '+') {
    var FIRST_CHARACTER_THAT_DOES_NOT_BELONG_TO_THE_COUNTRY_CODE = 3;
    phoneNumber = '0' + phoneNumber.substring(FIRST_CHARACTER_THAT_DOES_NOT_BELONG_TO_THE_COUNTRY_CODE);
  }

  return phoneNumber.replace(/[^0-9]/, '');
}

function lookup (input) {
  if (data === undefined) {
    return [];
  }

  var resultsInNames = lookupInNames(input);
  var resultsInPhoneNumbers = lookupInPhoneNumbers(input);
  return prepareResults(resultsInNames, resultsInPhoneNumbers);
}

function lookupInNames (input) {
  return lookupHelper(input, normalizeName, calculateScoreForName);
}

function calculateScoreForName (person, normalizedName) {
  return computeLevenshteinDistance(normalizedName, person.normalizedName);
}

function lookupInPhoneNumbers (input) {
  return lookupHelper(input, normalizePhoneNumber, calculateScoreForPhoneNumbers);
}

function calculateScoreForPhoneNumbers (person, normalizedPhoneNumber) {
  var scores = person.normalizedPhone.map(function (phoneNumberForPerson) {
    return computeLevenshteinDistance(normalizedPhoneNumber, phoneNumberForPerson);
  });
  return Math.min.apply(null, scores);
}

function lookupHelper (input, normalizeInput, calculateScore) {
  var normalizedInput = normalizeInput(input);
  if (isInputInvalid(normalizedInput)) {
    return [];
  }

  return data.map(function (person) {
    return {
      score: calculateScore(person, normalizedInput),
      person: person
    };
  });
}

function isInputInvalid (input) {
  return input === undefined || input.length < MINIMUM_INPUT_LENGTH;
}

function prepareResults (resultsInNames, resultsInPhoneNumbers) {
  var results = resultsInNames.concat(resultsInPhoneNumbers);
  results = sortResults(results);
  results = sliceResults(results);
  results = sortResultsWithSameScoreAlphabetically(results);
  results = removeScoreDataFromResults(results);
  return results;
}

function sortResults (results) {
  results.sort(compareByScore);
  return results;
}

function sliceResults (results) {
  return results.slice(0, MAXIMUM_RESULT_COUNT);
}

function sortResultsWithSameScoreAlphabetically (results) {
  results.sort(compareByName);
  results.sort(compareByScore);
  return results;
}

function compareByScore (a, b) {
  return a.score - b.score;
}

function compareByName (a, b) {
  return a.person.name.localeCompare(b.person.name);
}

function removeScoreDataFromResults (results) {
  return results.map(function (result) {
    return result.person;
  });
}

// http://ginstrom.com/scribbles/2007/12/01/fuzzy-substring-matching-with-levenshtein-distance-in-python/
function computeLevenshteinDistance (needle, haystack) {
  if (needle.length < 1) {
    return haystack.contains(needle) ? 1 : 0;
  }

  // create zero-filled array
  var row1 = Array.apply(null, new Array(haystack.length + 1)).map(Number.prototype.valueOf, 0);

  for (var i = 0; i < needle.length; ++i) {
    var row2 = [i + 1];
    for (var j = 0; j < haystack.length; ++j) {
      var costs = needle[i] === haystack[j] ? 0 : 1;
      row2.push(Math.min(row1[j + 1] + 1, //deletion
                         row2[j] + 1,     //insertion
                         row1[j] + costs  //substitution
                         ));
    }
    row1 = row2;
  }
  return Math.min.apply(null, row1);
}
