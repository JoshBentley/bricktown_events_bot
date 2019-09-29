const puppeteer = require("puppeteer");
const logger = require("../util/logger");
const dateParser = require("../util/dateParser");

const url = "https://www.coxconventioncenter.com/events";
const screenWidth = 1280;
const screenHeight = 800;
const timeout = 1000;

/**
 * Scrapes the cox convention center calendar for events for each month
 * @param {number} months How many months the scraper should scrape
 * @param {boolean} headless Should the browser run headless. Default true
 *
 * @return {array} array of objects containing events data
 */
module.exports = async function scrapeFor(months, headless = true) {
  try {
    logger(`launching new browser`);
    const browser = await puppeteer.launch({
      headless: headless,
      defaultViewport: { width: screenWidth, height: screenHeight }
    });
    const page = await browser.newPage();

    logger(`navigating to ${url}`);
    await page.goto(url, {
      waitUntil: "networkidle0"
    });

    async function scrapeData() {
      let month = await page.evaluate(() => {
        return document.querySelector(".cal-month").innerText;
      });
      logger(`Scraping data for ${month}`);
      const results = await page.evaluate(() => {
        let data = [];
        let events = document.querySelectorAll(".fc-content");
        let month = document.querySelector(".cal-month").textContent;
        events.forEach(event => {
          let date = `${month},${
            event.querySelector(".fc-date").textContent
          },${new Date().getFullYear()}`;
          let id = "";
          let name = event.querySelector(".info > h3 > a").textContent;
          let time = event.querySelector(".info > span").textContent;
          let info = event.querySelector(".info > .image_wrap > a").href;
          data.push({ id, name, date, time, info });
        });

        return data;
      });
      return results;
    }

    async function clickNext() {
      await page.click(".cal-next");
      await page.waitFor(".fc-content", { timeout: timeout }).catch(() => {
        logger(`This month does not contain events`);
      });
      logger(`navigating to the next page`);
    }

    function parseDates(events) {
      events.forEach(event => {
        event.date = dateParser(event.date);
      });
    }

    function addIds(events) {
      events.forEach(event => {
        event.id = `cox${event.date.split("-").join("")}`;
      });
    }

    let results = [];

    for (let i = 0; i < months; i++) {
      results.push(...(await scrapeData()));
      await clickNext();
    }

    parseDates(results);
    addIds(results);

    logger(`closing browser`);
    await browser.close();

    return results;
  } catch (err) {
    console.log(err);
  }
};
