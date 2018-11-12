(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _forklift = require('../models/forklift.js');

var _forklift2 = _interopRequireDefault(_forklift);

var _map = require('../models/map.js');

var _map2 = _interopRequireDefault(_map);

var _package = require('../models/package.js');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fl = new _forklift2.default(5); //SI2018

var config = new _map2.default(32, 32, 16, 16);
var map = config.initMap();

var packages = [];

var canvas = null;
var ctx = null;
var spritesheet = null;

var spritesheetLoaded = false;

function init() {
    canvas = document.getElementById('grid');

    canvas.width = config.getFullWidth();
    canvas.height = config.getFullHeight();

    ctx = canvas.getContext("2d");

    spritesheet = new Image();
    spritesheet.src = './src/img/sprites.png';
    spritesheet.onload = loaded;
}

function loaded() {
    spritesheetLoaded = true;
    drawMap();
    spawnPackage(5);
    spawnForklift();
}

function drawMap() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var sprite = 1;

    for (var x = 0; x < config.getTileWidth(); x++) {
        for (var y = 0; y < config.getTileHeight(); y++) {
            switch (map[x][y]) {
                case 1:
                    sprite = 1;
                    break;
                case 3:
                    sprite = 3;
                    break;
                case 4:
                    sprite = 4;
                    break;
                case 5:
                    sprite = 5;
                    break;
                case 7:
                    sprite = 7;
                    break;
            }

            ctx.drawImage(spritesheet, sprite * config.getWidth(), 0, config.getWidth(), config.getHeight(), x * config.getWidth(), y * config.getHeight(), config.getWidth(), config.getHeight());
        }
    }
}

function spawnPackage(count) {
    var sprite = 2;

    for (var count; count > 0; count--) {
        var x = Math.floor(Math.random() * 16);
        var y = Math.floor(Math.random() * 14);

        map[x][y] = sprite;

        ctx.drawImage(spritesheet, sprite * config.getWidth(), 0, config.getWidth(), config.getHeight(), x * config.getWidth(), y * config.getHeight(), config.getWidth(), config.getHeight());
    }
}

function spawnForklift() {
    var sprite = 0;

    var x = 15;
    var y = 15;

    map[x][y] = sprite;

    ctx.drawImage(spritesheet, sprite * config.getWidth(), 0, config.getWidth(), config.getHeight(), x * config.getWidth(), y * config.getHeight(), config.getWidth(), config.getHeight());
}

init();

console.log(map);

},{"../models/forklift.js":2,"../models/map.js":3,"../models/package.js":4}],2:[function(require,module,exports){
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

},{}]},{},[1]);
