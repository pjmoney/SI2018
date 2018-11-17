'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _package = require('../models/package.js');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackageService = function () {
    function PackageService() {
        _classCallCheck(this, PackageService);
    }

    _createClass(PackageService, [{
        key: 'randomPackage',
        value: function randomPackage(count, map) {
            var packages = [];

            while (count > 0) {
                var x = Math.floor(Math.random() * map.width);
                var y = Math.floor(Math.random() * (map.height - 1) * 0.75);

                var position = {
                    x: x,
                    y: y
                };

                var weight = Math.floor(Math.random() * 30) + 1;
                var length = Math.floor(Math.random() * 20) + 1;
                var width = Math.floor(Math.random() * 20) + 1;
                var height = Math.floor(Math.random() * 20) + 1;

                packages.push(new _package2.default(weight, width, height, length, position));
                count--;
            }

            return packages;
        }
    }]);

    return PackageService;
}();

exports.default = PackageService;
//# sourceMappingURL=packageService.js.map