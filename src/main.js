const chesapeakeScraper = require("./scrapers/chesapeakeScraper");
const coxScraper = require("./scrapers/coxScraper");
const logger = require("./util/logger");
const saveToJson = require("./util/saveToJson");

async function main() {
  try {
    let data = [];
    data.push(...(await chesapeakeScraper(3, true)));
    data.push(...(await coxScraper(3, true)));
    return data;
  } catch (err) {
    console.error(err);
  }
}

main()
  .then(data => {
    saveToJson("../events.json", { events: data }, true);
    logger(`done`);
  })
  .catch(err => {
    console.error(err);
  });
