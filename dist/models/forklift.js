"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Forklift = function () {
    function Forklift(speed) {
        _classCallCheck(this, Forklift);

        this.speed = speed;
        this.isCarrying = false;
    }

    _createClass(Forklift, [{
        key: "getSpeed",
        value: function getSpeed() {
            return this.speed;
        }
    }, {
        key: "isFree",
        value: function isFree() {
            return this.isCarrying;
        }
    }]);

    return Forklift;
}();

exports.default = Forklift;
//# sourceMappingURL=forklift.js.map