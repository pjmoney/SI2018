"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
    function Map(width, height, tileWidth, tileHeight) {
        _classCallCheck(this, Map);

        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.map = [[]];
    }

    _createClass(Map, [{
        key: "getWidth",
        value: function getWidth() {
            return this.width;
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            return this.height;
        }
    }, {
        key: "getTileWidth",
        value: function getTileWidth() {
            return this.tileWidth;
        }
    }, {
        key: "getTileHeight",
        value: function getTileHeight() {
            return this.tileHeight;
        }
    }, {
        key: "getFullWidth",
        value: function getFullWidth() {
            return this.width * this.tileWidth;
        }
    }, {
        key: "getFullHeight",
        value: function getFullHeight() {
            return this.height * this.tileHeight;
        }
    }, {
        key: "initMap",
        value: function initMap() {
            for (var x = 0; x < this.tileWidth; x++) {
                this.map[x] = [];
                for (var y = 0; y < this.tileHeight; y++) {
                    if (y == this.tileWidth - 2) this.map[x][y] = 7;else if (y == this.tileWidth - 1) {
                        if (x < 5) {
                            this.map[x][y] = 3;
                        } else if (x >= 5 && x < 10) {
                            this.map[x][y] = 4;
                        } else {
                            this.map[x][y] = 5;
                        }
                    } else {
                        this.map[x][y] = 1;
                    }
                }
            }
            this.map[15][14] = 1;
            this.map[15][15] = 1;

            return this.map;
        }
    }]);

    return Map;
}();

exports.default = Map;
//# sourceMappingURL=map.js.map