"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function Map(width, height, tileWidth, tileHeight) {
    _classCallCheck(this, Map);

    this.grid = [[]];

    this.width = width;
    this.height = height;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;

    this.parts = {
        forklift: 0,
        floor: 1,
        package: 2,
        food: 3,
        building: 4,
        agd: 5,
        garden: 7
    };
};

exports.default = Map;
//# sourceMappingURL=map.js.map