const path = require("path");
const fs = require("fs");

module.exports = {
  getEventByDate,
  getEventsByDateRange
};

let data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../events.json"))
);
let events = data.events;

function getEventByDate(date) {
  return events.filter(event => {
    return convertDateString(event.date) == convertDateString(date);
  });
}

function getEventsByDateRange(start, end) {
  let datesRange = getDateArray(start, end);
  return events.filter(event => {
    return datesRange.includes(convertDateString(event.date));
  });
}

function getDateArray(start, end) {
  start = new Date(start);
  end = new Date(end);
  let current = start;

  let myArr = [];

  if (current >= end) {
    console.log("Start date should be before end date");
  } else {
    while (current <= end) {
      myArr.push(current.toLocaleDateString());
      current.setDate(current.getDate() + 1);
    }
  }

  return myArr;
}

function convertDateString(date) {
  return new Date(date).toLocaleDateString();
}
