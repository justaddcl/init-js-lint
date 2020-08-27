#! /usr/bin/env node
import "@babel/polyfill";
import installPkgs from './installPkgs';

// determine which airbnb config based on user input
const airbnbConfigPkg = process.argv[2] === 'react' ? 'eslint-config-airbnb' : 'eslint-config-airbnb-base';

// install packages via npm
installPkgs(airbnbConfigPkg);