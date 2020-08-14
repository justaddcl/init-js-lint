import "@babel/polyfill";
import axios from 'axios';
import chalk from 'chalk';
import packages from './packages';

const npmInstall = (airbnbConfigPkg, peerDependencies, pkgVersion) => {
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

  // debug which packages will be installed
  // console.log(pkgsToInstall.join(' '));

  // npm i command
  // shell.exec(`npm i -D ${pkgsToInstall.join(' ')}`);
  // shell.exec(`echo ${pkgsToInstall.join(' ')}`);
  return pkgsToInstall;
}

const getPeerDeps = async (pkgName) => {
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
    return npmInstall(pkgName, peerDependencies, version);
  } catch (error) {
    console.error(chalk.red(error));
  }
};

module.exports = { getPeerDeps };