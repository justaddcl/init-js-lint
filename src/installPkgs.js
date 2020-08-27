import { exec } from 'child_process';
import { getPeerDeps } from './index';
import { logSuccess, logError } from './logging';

const installPkgs = async (airbnbConfigPkg) => {
  // fetch and log packages to be installed
  const pkgs = await getPeerDeps(airbnbConfigPkg);

  // debug to make sure shell commands are working
  // exec(`echo ${pkgs.join(' ')}` , ((error, stdout) => {
  //   if (error) {
  //     logError(`exec error: ${error}`);
  //     console.error(`exec error: ${error}`);
  //     return;
  //   }

  //   console.log(stdout);
  //   logSuccess('Done.');
  // }));

  console.log('Installing packages...');
  // run the shell command
  // TODO: remove shelljs
  // shell.exec(`npm i -D ${pkgsToInstall.join(' ')}`);

  exec(`npm i -D ${pkgs.join(' ')}`, (error, stdout) => {
    if (error) {
      logError(`exec error: ${error}`);
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(stdout);
    logSuccess('Done.');
  });
};

export default installPkgs;
