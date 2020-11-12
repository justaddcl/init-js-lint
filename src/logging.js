const chalk = require('chalk');

/**
 * @function logInfo logs to console with info styling
 * @param {string} message message to log
 * @param {string} [color = 'cyan'] log style color (optional, defaults to cyan)
 */
const logInfo = (msg, color = 'cyan') => console.log(chalk[color](msg));

/**
 * @function logSuccess logs to console with success styling
 * @param {string} message message to log
 */
const logSuccess = (msg) => console.log(chalk.green(msg));

/**
 * @function logWarning logs to console with warning styling
 * @param {string} message message to log
 */
const logWarning = (warning) => console.warn(chalk.yellow(warning));

/**
 * @function logError logs to console with error styling
 * @param {string} message message to log
 */
const logError = (error) => console.error(chalk.red(error));

/**
 * @function logHeader logs to console with heaader styling
 * @param {string} message message to log
 */
const logHeader = (header) => console.error(chalk.bgWhite.black(header));

/**
 * @function logPkgs
 * @param {Object[]} pkgGroups - the group of packages to log
 * @param {string} pkgGroups[].name - name of package group
 * @param {(string[]|string)} pkgGroup[].pkgs - packages that make up the group
 */
const logPkgs = (pkgGroups) => {
  console.log('NPM will install the following packages: @latest');
  console.log();
  pkgGroups.forEach((group) => {
    logHeader(` ${group.name}: `);
    if (group.pkgs && group.pkgs.length > 0) {
      if (typeof group.pkgs === 'string') {
        logInfo(group.pkgs);
      } else {
        logInfo(group.pkgs.join('\n'));
      }
      console.log();
    } else {
      console.log('No packages');
    }
  });
  console.log();
};

module.exports = {
  logInfo,
  logSuccess,
  logWarning,
  logError,
  logHeader,
  logPkgs,
};
