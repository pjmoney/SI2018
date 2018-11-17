(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _mapService = require('./services/mapService.js');

var _mapService2 = _interopRequireDefault(_mapService);

var _packageService = require('./services/packageService.js');

var _packageService2 = _interopRequireDefault(_packageService);

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

var store = document.getElementById('store');
var stored = document.getElementById('stored');

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
    mapService.drawPackage(packages, store);
}

},{"./services/mapService.js":4,"./services/packageService.js":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Package = function Package(weight, width, height, length, position) {
    _classCallCheck(this, Package);

    this.weight = weight;
    this.width = width;
    this.height = height;
    this.length = length;
    this.position = position;
};

exports.default = Package;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map = require('../models/map.js');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mapService = function () {
    function mapService(width, height, tileWidth, tileHeight) {
        _classCallCheck(this, mapService);

        this.map = new _map2.default(width, height, tileWidth, tileHeight);
        this.ctx = null;
        this.sprites = null;
    }

    _createClass(mapService, [{
        key: 'getWidth',
        value: function getWidth() {
            return this.map.width * this.map.tileWidth;
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this.map.height * this.map.tileHeight;
        }

        //update map

    }, {
        key: 'setGrid',
        value: function setGrid(x, y, value) {
            this.map.grid[x][y] = value;
        }

        //init map

    }, {
        key: 'init',
        value: function init() {
            var min = Math.round(this.map.width * 0.25);
            var max = Math.round(this.map.height * 0.75) - 1;

            for (var x = 0; x < this.map.width; x++) {
                this.map.grid[x] = [];
                for (var y = 0; y < this.map.height; y++) {
                    if (y > max) {
                        if (x < min) this.setGrid(x, y, this.map.parts.agd);else if (x < min * 2) this.setGrid(x, y, this.map.parts.building);else if (x > max) this.setGrid(x, y, this.map.parts.garden);else this.setGrid(x, y, this.map.parts.food);
                    } else this.setGrid(x, y, this.map.parts.floor);
                }
            }
            console.log(this.map.grid);
            return this.map.grid;
        }

        //draw base map

    }, {
        key: 'drawMap',
        value: function drawMap() {
            var sprite = null;

            for (var x = 0; x < this.map.width; x++) {
                for (var y = 0; y < this.map.height; y++) {
                    switch (this.map.grid[x][y]) {
                        case this.map.parts.food:
                            sprite = this.map.parts.food;
                            break;
                        case this.map.parts.building:
                            sprite = this.map.parts.building;
                            break;
                        case this.map.parts.agd:
                            sprite = this.map.parts.agd;
                            break;
                        case this.map.parts.garden:
                            sprite = this.map.parts.garden;
                            break;
                        default:
                            sprite = this.map.parts.floor;
                            break;
                    }
                    this.redraw(x, y, sprite);
                }
            }
        }

        //redraw point

    }, {
        key: 'redraw',
        value: function redraw(x, y, sprite) {
            this.ctx.drawImage(this.sprites, sprite * this.map.tileWidth, 0, this.map.tileWidth, this.map.tileHeight, x * this.map.tileWidth, y * this.map.tileHeight, this.map.tileWidth, this.map.tileHeight);
        }

        //draw package

    }, {
        key: 'drawPackage',
        value: function drawPackage(packages, store) {
            console.log(packages);

            for (var x = 0; x < packages.length; x++) {
                this.setGrid(packages[x].position.x, packages[x].position.y, this.map.parts.package);
                this.redraw(packages[x].position.x, packages[x].position.y, this.map.parts.package);

                var li = document.createElement('li');
                store.appendChild(li);

                li.innerHTML += 'Package (' + packages[x].width + 'x' + packages[x].length + 'x' + packages[x].height + ', ' + packages[x].weight + ' kg' + ' x: ' + packages[x].position.x + ' y: ' + packages[x].position.y + ')';
            }
        }
    }]);

    return mapService;
}();

exports.default = mapService;

},{"../models/map.js":2}],5:[function(require,module,exports){
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

},{"../models/package.js":3}]},{},[1]);
