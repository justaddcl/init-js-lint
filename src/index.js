#!/usr/bin/env node

const chalk = require('chalk');
const { fetchPeerDeps, createPkgList, install } = require('./pkg-helpers');
const { logPkgs, logError, logWarning } = require('./logging');
const userPkgs = require('./user-packages');

// TODO: add help text
// TODO: add ability to download .eslintrc file

// determine which airbnb config based on user input
const airbnbConfigPkg =
  process.argv[2] === 'react'
    ? 'eslint-config-airbnb'
    : 'eslint-config-airbnb-base';

console.log(
  `Initializing ${chalk.bgWhite.black(
    ` ESLint Airbnb config: ${
      airbnbConfigPkg.includes('base')
        ? chalk.inverse(' Base ')
        : chalk.bgMagenta.white(' React ')
    }`,
  )}`,
);
console.log();

fetchPeerDeps(airbnbConfigPkg)
  .then((data) => {
    const { pkgData: { name, version }, peerDeps } = data;

    logPkgs([
      {
        name: 'ESLint config',
        pkgs: `${name}@${version}`,
      },
      {
        name: 'Peer Dependencies',
        pkgs: peerDeps,
      },
      {
        name: 'User-specified packages',
        pkgs: userPkgs,
      },
    ]);

    const pkgs = createPkgList(
      [name, version],
      [peerDeps, '@latest'],
      [userPkgs, '@latest'],
    );

    if (pkgs?.length > 0) {
      console.log('Installing packages...');
      install(pkgs);
    } else {
      logWarning(
        `No packages were installed in association with: ${airbnbConfigPkg}. This is most likely due to an error fetching and installing the dependencies. Please review any error messages and try again if this is an unexpected result.`,
      );
    }
  })
  .catch((error) => {
    logError(error);
  });
