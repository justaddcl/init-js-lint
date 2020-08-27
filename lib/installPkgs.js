"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _child_process = require("child_process");

var _index = require("./index");

var _logging = require("./logging");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
            console.log('Installing packages...'); // run the shell command
            // TODO: remove shelljs
            // shell.exec(`npm i -D ${pkgsToInstall.join(' ')}`);

            (0, _child_process.exec)("npm i -D ".concat(pkgs.join(' ')), function (error, stdout) {
              if (error) {
                (0, _logging.logError)("exec error: ".concat(error));
                console.error("exec error: ".concat(error));
                return;
              }

              console.log(stdout);
              (0, _logging.logSuccess)('Done.');
            });

          case 5:
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

var _default = installPkgs;
exports["default"] = _default;