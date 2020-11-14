const { spawn } = require('child_process');
const axios = require('axios');
const semverValid = require('semver/functions/valid');
const semverValidRange = require('semver/ranges/valid');
const { logSuccess, logError } = require('./logging');

/**
 * @function validateVersion
 * @param {string} version
 * @returns {boolean} if given version is a valid semver version
 */
const validateVersion = (version) => {
  if (!version) {
    throw new Error('Cannot validate semver: no version provided');
  }
  return !!(
    semverValid(version) ||
    semverValidRange(version) ||
    version === 'latest'
  );
};

/**
 * @function versionPkg
 * @param {string} name npm package name
 * @param {string} [version = 'latest'] desired package version, defaults to latest
 * @returns {string} npm package with version
 */
const versionPkg = (name, version = 'latest') => {
  if (!name) {
    throw new Error('Package versioning error: package name not provided');
  }

  if (!validateVersion(version)) {
    throw new Error(
      `Package versioning error: invalid syntax used for version: ${version}`,
    );
  }

  return `${name}@${version}`;
};

/**
 * @function createPkgList - generates npm-friendly list of packages
 * @param {Object[]} pkgGroups - objects with name and versions of packages
 * @param {(string|string[])} pkgGroups.pkgs - name of packages
 * @returns {string[]} - array of packages names and versions
 */
const createPkgList = (...pkgGroups) => {
  if (pkgGroups.length === 0) {
    throw new Error(
      'Error creating package list: no packages provided to list',
    );
  }
  return pkgGroups
    .map((group) => {
      const [pkgs, version] = group;
      if (!pkgs) {
        throw new Error(
          'Error creating package list: package group did not contain any packages',
        );
      }

      if (typeof pkgs === 'string') {
        return versionPkg(pkgs, version);
      }
      return pkgs.map((pkg) => versionPkg(pkg, version));
    })
    .flat();
};

/**
 *
 * @param {string} pkgName - name of package to get peer dependencies for
 * @returns {Object} data
 * @returns {string} data.pkgData.name - package name
 * @returns {string} data.pkgData.version - package version
 * @returns {string[]} data.peerDeps - peer dependencies
 */
const fetchPeerDeps = async (pkgName) => {
  try {
    const response = await axios.get(
      `https://api.npms.io/v2/package/${pkgName}`,
    );
    const {
      data: {
        collected: {
          metadata: { version, peerDependencies },
        },
      },
    } = response;

    return {
      pkgData: {
        name: pkgName,
        version,
      },
      peerDeps: Object.keys(peerDependencies),
    };
  } catch (error) {
    const fetchError = new Error();
    fetchError.name = `Failed to fetch peer dependencies for ${pkgName}`;
    if (error.response) {
      fetchError.message = `${error.response.status}${
        error.response.data?.code ? ` ${error.response.data.code} - ` : ''
      }${error.response.data?.message || ''}: ${error.config.url}`;
    }
    throw fetchError;
  }
};

/**
 * @function install - installs packages via npm
 * @param {string[]} [pkgs = []] array of npm packages to install
 * @param {Object} [options = {}] options object
 * @param {boolean} [options.dev = false] if npm should install as dev dependency
 */
const install = (pkgs = [], { dev = false } = {}) => {
  if (pkgs.length > 0) {
    console.log(`npm i ${dev ? '-D ' : ''}${pkgs.join(' ')}`);
    const installArgs = ['i'];
    if (dev) installArgs.push('-D');
    const npmi = spawn('npm', installArgs.concat(pkgs));

    npmi.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    npmi.on('error', (error) => {
      logError(error);
    });

    npmi.stderr.on('data', (error) => {
      logError(error);
    });

    npmi.on('close', (code) => {
      code === 0
        ? logSuccess('Done.')
        : logError(`Exited npm install process with code ${code}`);
    });
  }
};

module.exports = {
  validateVersion,
  versionPkg,
  createPkgList,
  fetchPeerDeps,
  install,
};
