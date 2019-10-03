const fetcher = require("./fetcher");

module.exports = {
  byDay,
  byWeek,
  byMonth
};

const months = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
};

const futureMonths = {
  january: 12,
  february: 13,
  march: 14,
  april: 15,
  may: 16,
  june: 17,
  july: 18,
  august: 19,
  september: 20,
  october: 21,
  november: 22,
  december: 23
};

let today = new Date();
let thisMonth = today.getMonth();

function byDay(date) {
  date = date.toLowerCase();

  if (date === "today") {
    return fetcher.getEventByDate(today.toLocaleDateString());
  } else if (date === "tomorrow") {
    today.setDate(today.getDate() + 1);
    return fetcher.getEventByDate(today.toLocaleDateString());
  } else if (isValidDate(date)) {
    date = new Date(date).toLocaleDateString();
    return fetcher.getEventByDate(date);
  } else {
    return "Sorry, I didn't understand that.";
  }
}

function byWeek(date) {
  date = date.toLowerCase();

  if (date == "this week") {
    let start = getSunday(today);
    let end = getSaturday(today);
    return fetcher.getEventsByDateRange(start, end);
  } else if (date == "next week") {
    today.setDate(today.getDate() + 7);
    let start = getSunday(today);
    let end = getSaturday(today);
    return fetcher.getEventsByDateRange(start, end);
  } else if (isValidDate(date)) {
    date = new Date(date).toLocaleDateString();
    let start = getSunday(date);
    let end = getSaturday(date);
    return fetcher.getEventsByDateRange(start, end);
  }
}

function byMonth(date) {
  let start;
  let end;
  date = date.toLowerCase();

  switch (date) {
    case "this month":
      return getDataForMonth(today);
    case "next month":
      today = today.setMonth(today.getMonth() + 1);
      return getDataForMonth(today);
    case "jan":
    case "january":
      if (thisMonth > months.january) {
        today = today.setMonth(thisMonth + (futureMonths.january - thisMonth));
      } else {
        today = today.setMonth(months.january);
      }
      return getDataForMonth(today);
    case "feb":
    case "february":
      break;
    case "mar":
    case "march":
      break;
    case "apr":
    case "april":
      break;
    case "may":
      break;
    case "jun":
    case "june":
      break;
    case "jul":
    case "july":
      break;
    case "aug":
    case "august":
      break;
    case "sep":
    case "september":
      break;
    case "oct":
    case "october":
      if (thisMonth > months.october) {
        today = today.setMonth(thisMonth + (futureMonths.october - thisMonth));
      } else {
        today = today.setMonth(months.october);
      }
      return getDataForMonth(today);
    case "nov":
    case "november":
      break;
    case "dec":
    case "december":
      if (thisMonth > months.december) {
        today = today.setMonth(thisMonth + (futureMonths.december - thisMonth));
      } else {
        today = today.setMonth(months.december);
      }
      return getDataForMonth(today);
  }
}

function isValidDate(date) {
  date = new Date(date);
  return date.toString() == "Invalid Date" ? false : true;
}

function getSunday(date) {
  let sunday = new Date(date);
  sunday.setDate(sunday.getDate() - sunday.getDay());
  return sunday.toLocaleDateString();
}

function getSaturday(date) {
  let saturday = new Date(date);
  saturday.setDate(saturday.getDate() + (6 - saturday.getDay()));
  return saturday.toLocaleDateString();
}

function getFirstDayOfMonth(date) {
  let firstDay = new Date(date);
  return new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    1
  ).toLocaleDateString();
}

function getLastDayOfMonth(date) {
  let lastDay = new Date(date);
  return new Date(
    lastDay.getFullYear(),
    lastDay.getMonth() + 1,
    0
  ).toLocaleDateString();
}

function getDataForMonth(date) {
  start = getFirstDayOfMonth(date);
  end = getLastDayOfMonth(date);
  return fetcher.getEventsByDateRange(start, end);
}
