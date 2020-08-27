"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPeerDeps = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _packages = _interopRequireDefault(require("./packages"));

var _logging = require("./logging");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var npmInstall = function npmInstall(airbnbConfigPkg, peerDependencies, pkgVersion) {
  // extract peer dependencies package names
  var peerDeps = Object.keys(peerDependencies); // list any user-specified packages to install - if any

  var userPkgs = _packages["default"] && _packages["default"].length > 0 ? _packages["default"].map(function (pkg) {
    return "".concat(pkg, "@latest");
  }) : []; // create list of all packages to install

  var pkgsToInstall = ["".concat(airbnbConfigPkg, "@").concat(pkgVersion)].concat(peerDeps.map(function (dep) {
    return "".concat(dep, "@latest");
  })).concat(userPkgs); // log packages to be installed

  (0, _logging.logPkgs)({
    name: airbnbConfigPkg,
    version: pkgVersion
  }, peerDeps, _packages["default"]);
  return pkgsToInstall;
};

var getPeerDeps = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(pkgName) {
    var response, _response$data$collec, version, peerDependencies;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios["default"].get("https://api.npms.io/v2/package/".concat(pkgName));

          case 3:
            response = _context.sent;
            _response$data$collec = response.data.collected.metadata, version = _response$data$collec.version, peerDependencies = _response$data$collec.peerDependencies;
            return _context.abrupt("return", npmInstall(pkgName, peerDependencies, version));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            (0, _logging.logError)(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getPeerDeps(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getPeerDeps = getPeerDeps;