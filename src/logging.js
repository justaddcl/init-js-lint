import chalk from 'chalk';

const logPkgs = (airbnbConfig, peerDeps, packages) => {
  console.log('NPM will install the following packages: \n');
  console.log(chalk.bgWhite.black(` ESLint Airbnb config: `));
  console.log(chalk.green(`${airbnbConfig.name}@${airbnbConfig.version}`));
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
};

const logSuccess = msg => {
  console.log(chalk.green(msg));
}

const logError = error => {
  console.error(chalk.bgRed(error));
};

export { logPkgs, logSuccess, logError };