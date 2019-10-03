const chesapeakeScraper = require("./scrapers/chesapeakeScraper");
const coxScraper = require("./scrapers/coxScraper");
const logger = require("./util/logger");
const saveToJson = require("./util/saveToJson");

const months = 3;

function main() {
  runScraper()
    .then(data => {
      saveToJson("../events.json", { events: data }, true);
      logger(`done`);
    })
    .catch(err => {
      console.error(err);
    });
}

async function runScraper() {
  try {
    let data = [];
    data.push(...(await chesapeakeScraper(months)));
    data.push(...(await coxScraper(months)));
    return data;
  } catch (err) {
    console.error(err);
  }
}

main();
