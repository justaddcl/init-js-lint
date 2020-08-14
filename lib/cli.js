#! /usr/bin/env node
"use strict";

var _shelljs = _interopRequireDefault(require("shelljs"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var airbnbConfigPkg = process.argv[2] === 'react' ? 'eslint-config-airbnb' : 'eslint-config-airbnb-base';

var installPkgs = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(airbnbConfigPkg) {
    var pkgs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _index.getPeerDeps)(airbnbConfigPkg);

          case 2:
            pkgs = _context.sent;

            // console.log(pkgs);
            _shelljs["default"].exec("echo ".concat(pkgs.join(' ')));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function installPkgs(_x) {
    return _ref.apply(this, arguments);
  };
}();

installPkgs(airbnbConfigPkg);