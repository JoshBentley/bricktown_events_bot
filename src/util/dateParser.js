/**
 * Takes in a custom csv string ("Mon",dd,yyyy) and returns in mm-dd-yyyy format
 * @param {string} dateString
 *
 * @returns {string} 'mm-dd-yyyy'
 */
module.exports = function parseDate(dateString) {
  let dateSplit = dateString.split(",");
  let date = `${monthStringToNum(dateSplit[0])}-${dateSplit[1]}-${
    dateSplit[2]
  }`;

  return date;
};

/**
 * Converts a string month to it's corresponding number; i.e Jan -> 01
 * @param {number} month
 */
function monthStringToNum(month) {
  month = month.toLowerCase();
  let months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
  ];
  if (months.includes(month)) {
    return padNum(months.indexOf(month) + 1);
  } else {
    console.error(`${month} is not a valid month`);
    return NaN;
  }
}

function padNum(num) {
  return (num < 10 ? "0" : "") + num;
}
