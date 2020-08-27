import axios from 'axios';
import packages from './packages';
import { logPkgs, logError } from './logging';

const npmInstall = (airbnbConfigPkg, peerDependencies, pkgVersion) => {
  // extract peer dependencies package names
  const peerDeps = Object.keys(peerDependencies);
  // list any user-specified packages to install - if any
  const userPkgs =
    packages && packages.length > 0
      ? packages.map((pkg) => `${pkg}@latest`)
      : [];
  // create list of all packages to install
  const pkgsToInstall = [`${airbnbConfigPkg}@${pkgVersion}`]
    .concat(peerDeps.map((dep) => `${dep}@latest`))
    .concat(userPkgs);

  // log packages to be installed
  logPkgs({ name: airbnbConfigPkg, version: pkgVersion }, peerDeps, packages);
  return pkgsToInstall;
};

const getPeerDeps = async (pkgName) => {
  try {
    const response = await axios.get(
      `https://api.npms.io/v2/package/${pkgName}`
    );
    const {
      data: {
        collected: {
          metadata: { version, peerDependencies },
        },
      },
    } = response;
    return npmInstall(pkgName, peerDependencies, version);
  } catch (error) {
    logError(error);
  }
};

export { getPeerDeps };
