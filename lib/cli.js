#! /usr/bin/env node
"use strict";

require("@babel/polyfill");

var _installPkgs = _interopRequireDefault(require("./installPkgs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// TODO: add help text
// TODO: add ability to download .eslintrc file
// determine which airbnb config based on user input
var airbnbConfigPkg = process.argv[2] === 'react' ? 'eslint-config-airbnb' : 'eslint-config-airbnb-base'; // install packages via npm

(0, _installPkgs["default"])(airbnbConfigPkg);