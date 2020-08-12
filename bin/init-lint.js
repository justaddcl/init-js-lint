#! /usr/bin/env node
const shell = require("shelljs");
const axios = require('axios');
const chalk = require('chalk');
const packages = require('../packages');

const airbnbConfigPkg = process.argv[2] === 'react' ? 'eslint-config-airbnb' : 'eslint-config-airbnb-base';

const getPeerDeps = async (pkgName, callback) => {
  try {
    const response = await axios.get(`https://api.npms.io/v2/package/${pkgName}`);
    const {
      data: {
        collected: {
          metadata: {
            version,
            peerDependencies
          }
        },
      },
    } = response;
    callback(peerDependencies, version);
  } catch (error) {
    console.error(chalk.red(error));
  }
};

const npmInstall = (peerDependencies, pkgVersion) => {
  // extract peer dependencies package names
  const peerDeps = Object.keys(peerDependencies);
  // list any user-specified packages to install - if any
  const userPkgs = packages && packages.length > 0
    ? packages.map(pkg => `${pkg}@latest`)
    : [];
  // create list of all packages to install
  const pkgsToInstall = [`${airbnbConfigPkg}@${pkgVersion}`].concat(peerDeps.map(dep => `${dep}@latest`)).concat(userPkgs);

  // log packages to be installed
  console.log('NPM will install the following packages: \n');
  console.log(chalk.bgWhite.black(` ESLint Airbnb config: `));
  console.log(chalk.green(`${airbnbConfigPkg}@${pkgVersion}`));
  console.log();
  console.log(chalk.bgWhite.black(` ESLint Airbnb config peer dependencies: `));
  console.log(chalk.green(peerDeps.join('\n')));
  console.log();
  console.log(chalk.bgWhite.black(' User-specified packages: '));
  if (packages && packages.length > 0) {
    console.log(chalk.green(packages.join('\n')));
  } else {
    console.log(chalk.green('No additional packages specified'));
  }
  console.log();

  console.log(pkgsToInstall.join(' '));

  // npm i command
  // shell.exec(`npm i -D pkgsToInstall.join(' '));
}

getPeerDeps(airbnbConfigPkg, npmInstall);
