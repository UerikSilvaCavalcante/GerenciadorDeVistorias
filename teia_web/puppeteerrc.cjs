const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Altera o local do cache para o Puppeteer
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
