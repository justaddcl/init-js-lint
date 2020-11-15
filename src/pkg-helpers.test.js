import { createPkgList, validateVersion, versionPkg } from './pkg-helpers';

describe('validateVersion function', () => {
  it('should throw an error if no version is given', () => {
    const noVersionError = new Error(
      'Cannot validate semver: no version provided',
    );
    expect(() => validateVersion()).toThrowError(noVersionError);
  });

  it('should return false for an invalid version', () => {
    expect(validateVersion('bugger')).toBe(false);
    expect(validateVersion('lates;t')).toBe(false);
    expect(validateVersion('.')).toBe(false);
    expect(validateVersion('v')).toBe(false);
    expect(validateVersion('0..')).toBe(false);
  });

  it('should return true for a valid version', () => {
    expect(validateVersion('1.0.17')).toBe(true);
    expect(validateVersion('v1.0.17')).toBe(true);
    expect(validateVersion('=1.0.17')).toBe(true);
    expect(validateVersion('latest')).toBe(true);
  });

  it('should return true for a valid version range', () => {
    expect(validateVersion('<1.0.17')).toBe(true);
    expect(validateVersion('<=1.0.17')).toBe(true);
    expect(validateVersion('>1.0.17')).toBe(true);
    expect(validateVersion('>=1.0.17')).toBe(true);
    expect(validateVersion('1.0.1 - 1.0.17')).toBe(true);
    expect(validateVersion('17.x')).toBe(true);
    expect(validateVersion('~17.x')).toBe(true);
    expect(validateVersion('~17.0.0-beta.17')).toBe(true);
    expect(validateVersion('^0.1.17')).toBe(true);
  });
});

describe('versionPkg function', () => {
  it('should throw an error if name param is not given', () => {
    const noParamError = new Error(
      'Package versioning error: package name not provided',
    );
    expect(() => versionPkg()).toThrowError(noParamError);
  });

  it('should throw an error if invalid version syntax is given', () => {
    const version = 'bugger';
    const invalidVersion = new Error(
      `Package versioning error: invalid syntax used for version: ${version}`,
    );
    expect(() => versionPkg('bslint', version)).toThrowError(invalidVersion);
  });

  it('should return a string', () => {
    expect(typeof versionPkg('test')).toBe('string');
  });

  it('should return a package name and version matching what was passed in', () => {
    const [name, version] = ['bugger', '^1.0.17'];
    expect(versionPkg(name, version)).toBe(`${name}@${version}`);

    const [name2, version2] = ['bugger', '17.0.1'];
    expect(versionPkg(name2, version2)).toBe(`${name2}@${version2}`);
  });

  it('should default package version to "latest" if none is given', () => {
    expect(versionPkg('bugger')).toMatch(/(latest)$/);
  });
});

describe('createPkgList function', () => {
  it('should throw an error if called without package groups', () => {
    const noParamError = new Error(
      'Error creating package list: no packages provided to list',
    );
    expect(() => createPkgList()).toThrowError(noParamError);
  });

  it('should throw an error if any package groups do not include packages', () => {
    const noPkgsError = new Error(
      'Error creating package list: package group did not contain any packages',
    );
    expect(() => createPkgList([])).toThrowError(noPkgsError);
    expect(() => createPkgList(['bugger', '1.0.17'], [])).toThrowError(
      noPkgsError,
    );
    expect(() => createPkgList([], ['test'])).toThrowError(noPkgsError);
  });

  it('should return a flat array with the versioned packages', () => {
    const pkgGroup = ['bugger'];
    expect(createPkgList(pkgGroup)).toEqual(['bugger@latest']);

    const pkgGroup2 = [['bugger']];
    expect(createPkgList(...pkgGroup2)).toEqual(['bugger@latest']);

    const pkgGroup3 = [['bugger'], ['test', '1.0.17'], ['bslint', 'latest']];
    expect(createPkgList(...pkgGroup3)).toEqual([
      'bugger@latest',
      'test@1.0.17',
      'bslint@latest',
    ]);
  });
});
