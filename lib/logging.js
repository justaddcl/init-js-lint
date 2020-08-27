"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logError = exports.logSuccess = exports.logPkgs = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logPkgs = function logPkgs(airbnbConfig, peerDeps, packages) {
  console.log('NPM will install the following packages: \n');
  console.log(_chalk["default"].bgWhite.black(" ESLint Airbnb config: "));
  console.log(_chalk["default"].green("".concat(airbnbConfig.name, "@").concat(airbnbConfig.version)));
  console.log();
  console.log(_chalk["default"].bgWhite.black(" ESLint Airbnb config peer dependencies: "));
  console.log(_chalk["default"].green(peerDeps.join('\n')));
  console.log();
  console.log(_chalk["default"].bgWhite.black(' User-specified packages: '));

  if (packages && packages.length > 0) {
    console.log(_chalk["default"].green(packages.join('\n')));
  } else {
    console.log(_chalk["default"].green('No additional packages specified'));
  }

  console.log();
};

exports.logPkgs = logPkgs;

var logSuccess = function logSuccess(msg) {
  console.log(_chalk["default"].green(msg));
};

exports.logSuccess = logSuccess;

var logError = function logError(error) {
  console.error(_chalk["default"].bgRed(error));
};

exports.logError = logError;