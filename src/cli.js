#! /usr/bin/env node
import "@babel/polyfill";
import installPkgs from './installPkgs';

// TODO: add help text
// TODO: add ability to download .eslintrc file

// determine which airbnb config based on user input
const airbnbConfigPkg = process.argv[2] === 'react' ? 'eslint-config-airbnb' : 'eslint-config-airbnb-base';

// install packages via npm
installPkgs(airbnbConfigPkg);