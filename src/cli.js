#! /usr/bin/env node
import shell from 'shelljs';
import { getPeerDeps } from './index'

// determine which airbnb config based on user input
const airbnbConfigPkg = process.argv[2] === 'react' ? 'eslint-config-airbnb' : 'eslint-config-airbnb-base';

const installPkgs = async (airbnbConfigPkg) => {
  // fetch and log packages to be installed
  const pkgs = await getPeerDeps(airbnbConfigPkg);

  // debug to make sure shell commands are working
  shell.exec(`echo ${pkgs.join(' ')}`);

  // run the shell command
  // shell.exec(`npm i -D ${pkgsToInstall.join(' ')}`);
}

installPkgs(airbnbConfigPkg);