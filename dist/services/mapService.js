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
//# sourceMappingURL=mapService.js.map