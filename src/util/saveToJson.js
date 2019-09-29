const fs = require("fs");
const logger = require("./logger");

/**
 * Saves an array of objects as a json file. Can be set to prettify
 * but pretty must be false if this will data will be called
 * @param {string} path path to save the file
 * @param {array} data array of objects
 * @param {boolean} pretty Pretty print json. default = false
 * @returns
 */
module.exports = function saveToJson(path, data, pretty = false) {
  try {
    if (pretty) {
      fs.writeFileSync(path, JSON.stringify(data, null, "\t"));
    } else {
      fs.writeFileSync(path, JSON.stringify(data));
    }
    logger(`writing data to ${path}`);
  } catch (err) {
    console.error(err);
  }
};
