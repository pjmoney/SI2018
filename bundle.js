(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _forklift = require('./models/forklift.js');

var _forklift2 = _interopRequireDefault(_forklift);

var _mapService = require('./services/mapService.js');

var _mapService2 = _interopRequireDefault(_mapService);

var _package = require('./models/package.js');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fl = new _forklift2.default(5); //SI2018

var packages = [];

var canvas = null;
var ctx = null;
var spritesheet = null;

var spritesheetLoaded = false;

canvas = document.getElementById('grid');

var map = new _mapService2.default(16, 16, 32, 32, canvas);
map.init();

// function init(){


//     canvas = document.getElementById('grid');

//     canvas.width = config.getFullWidth();
//     canvas.height = config.getFullHeight();

//     ctx = canvas.getContext("2d");

//     spritesheet = new Image();
//     spritesheet.src = './img/sprites.png';
//     spritesheet.onload = loaded;
// }

// function loaded()
// {
//     spritesheetLoaded = true;
//     drawMap();
//     spawnPackage(5);
//     spawnForklift();

// }

// function drawMap(){
//     let sprite = 1;

// 	for (var x=0; x < map.getTileWidth(); x++)
// 	{
// 		for (var y=0; y < config.getTileHeight(); y++)
// 		{
//             switch(map[x][y]){
//                 case 1:
//                     sprite = 1;
//                     break;
//                 case 3:
//                     sprite = 3;
//                     break;
//                 case 4:
//                     sprite = 4;
//                     break;
//                 case 5:
//                     sprite = 5;
//                     break;
//                 case 7:
//                     sprite = 7;
//                     break;
//             }
// 			redraw(sprite,x,y);
// 		}
//     }
// }

// function spawnPackage(count){
//     let sprite = 2;

//     for(var count; count > 0; count--){
//         let x = Math.floor(Math.random() * 16);
//         let y = Math.floor(Math.random() * 14);

//         map[x][y] = sprite;

//         redraw(sprite,x,y);
//     }
// }

// function spawnForklift(){
//     let sprite = 0;

//     let x = 15;
//     let y = 15;

//     map[x][y] = sprite;

//     redraw(sprite,x,y);
// }

// function redraw(sprite,x,y){
//     ctx.drawImage(spritesheet,
//     sprite*config.getWidth(), 0,
//     config.getWidth(), config.getHeight(),
//     x*config.getWidth(), y*config.getHeight(),
//     config.getWidth(), config.getHeight());
// }

// init();

// console.log(map);

},{"./models/forklift.js":2,"./models/package.js":4,"./services/mapService.js":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Package = function Package(weight) {
    _classCallCheck(this, Package);

    this.weight = weight;
};

exports.default = Package;

},{}],5:[function(require,module,exports){
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
    function mapService(width, height, tileWidth, tileHeight, canvas) {
        _classCallCheck(this, mapService);

        this.map = new _map2.default(width, height, tileWidth, tileHeight);
        this.canvas = canvas;
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

        //setmap

    }, {
        key: 'initGrid',
        value: function initGrid() {
            for (var x = 0; x < this.map.width; x++) {
                this.map.grid[x] = [];
                for (var y = 0; y < this.map.height; y++) {
                    if (y == this.map.width - 2) this.setGrid(x, y, this.map.parts.garden);else if (y == this.map.width - 1) {
                        if (x < 5) {
                            this.setGrid(x, y, this.map.parts.food);
                        } else if (x < 10) {
                            this.setGrid(x, y, this.map.parts.building);
                        } else {
                            this.setGrid(x, y, this.map.parts.agd);
                        }
                    } else {
                        this.setGrid(x, y, this.map.parts.floor);
                    }
                }
            }
            return this.map.grid;
        }

        //init drawing

    }, {
        key: 'init',
        value: function init() {
            console.log(this.initGrid());

            this.canvas.width = this.getWidth();
            this.canvas.height = this.getHeight();

            this.ctx = this.canvas.getContext("2d");

            this.sprites = new Image();
            this.sprites.src = './img/sprites.png';
            var funkcja = this.drawMap();
            this.sprites.onload = function () {
                funkcja();
            };
            this.drawMap();
        }
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
    }, {
        key: 'redraw',
        value: function redraw(x, y, sprite) {
            sprite;
            this.ctx.drawImage(this.sprites, sprite * this.map.tileWidth, 0, this.map.tileWidth, this.map.tileHeight, x * this.map.tileWidth, y * this.map.tileHeight, this.map.tileWidth, this.map.tileHeight);
        }
    }]);

    return mapService;
}();

exports.default = mapService;

},{"../models/map.js":3}]},{},[1]);
