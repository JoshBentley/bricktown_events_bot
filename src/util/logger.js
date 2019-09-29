/**
 * logs a message with a timestamp
 * @param {string} message
 */
module.exports = function logger(message) {
  const time = new Date().toLocaleTimeString();
  console.info(`${time} ${message}`);
};
