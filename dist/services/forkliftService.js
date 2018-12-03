'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _forklift = require('../models/forklift.js');

var _forklift2 = _interopRequireDefault(_forklift);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var position = {
  x: 15,
  y: 11
};

var ForkliftService = function ForkliftService() {
  _classCallCheck(this, ForkliftService);

  this.fork = new _forklift2.default(null, position);
};

exports.default = ForkliftService;
//# sourceMappingURL=forkliftService.js.map