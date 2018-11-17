'use strict';

var _mapService = require('./services/mapService.js');

var _mapService2 = _interopRequireDefault(_mapService);

var _packageService = require('./services/packageService.js');

var _packageService2 = _interopRequireDefault(_packageService);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = null;
var ctx = null;
var sprites = null;

//map dimensions
var map = {
    width: 16,
    height: 16,
    tileWidth: 32,
    tileHeight: 32
};

var mapService = new _mapService2.default(map.width, map.height, map.tileWidth, map.tileHeight);
var packageService = new _packageService2.default();

//number of packages
var nop = 5;
var packages = packageService.randomPackage(nop, mapService.map);

canvas = document.getElementById('grid');

canvas.width = mapService.getWidth();
canvas.height = mapService.getHeight();

ctx = canvas.getContext("2d");

sprites = new Image();
sprites.src = './img/sprites.png';

mapService.ctx = ctx;
mapService.sprites = sprites;

sprites.onload = loaded;

mapService.init();

function loaded() {
    mapService.drawMap();
    mapService.drawPackage(packages);
}
//# sourceMappingURL=index.js.map