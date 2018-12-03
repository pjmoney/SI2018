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
                    this.drawSprite(x, y, sprite);
                }
            }
        }

        //draw sprite

    }, {
        key: 'drawSprite',
        value: function drawSprite(x, y, sprite) {
            this.ctx.drawImage(this.sprites, sprite * this.map.tileWidth, 0, this.map.tileWidth, this.map.tileHeight, x * this.map.tileWidth, y * this.map.tileHeight, this.map.tileWidth, this.map.tileHeight);
        }

        //draw package

    }, {
        key: 'drawPackage',
        value: function drawPackage(packages) {

            var store = document.getElementById('store');
            var storeul = document.getElementById('storeul');
            var ul = document.createElement('ul');

            storeul.remove();
            ul.id = 'storeul';
            store.appendChild(ul);

            for (var x = 0; x < packages.length; x++) {
                if (!this.map.grid[packages[x].position.x][packages[x].position.y] == this.map.parts.package) this.setGrid(packages[x].position.x, packages[x].position.y, this.map.parts.floor);

                this.setGrid(packages[x].position.x, packages[x].position.y, this.map.parts.package);
                this.drawSprite(packages[x].position.x, packages[x].position.y, this.map.parts.package);

                var li = document.createElement('li');
                ul.appendChild(li);

                li.innerHTML += 'Package (' + packages[x].width + 'x' + packages[x].length + 'x' + packages[x].height + ', ' + packages[x].weight + ' kg' + ' x: ' + packages[x].position.x + ' y: ' + packages[x].position.y + ')';
            }
        }

        //draw forklift

    }, {
        key: 'drawForklift',
        value: function drawForklift(fork) {
            console.log("elo");
            this.setGrid(fork.position.x, fork.position.y, this.map.parts.forklift);
            this.drawSprite(fork.position.x, fork.position.y, this.map.parts.forklift);
            console.log(this.map.grid);
        }
    }]);

    return mapService;
}();

exports.default = mapService;
//# sourceMappingURL=mapService.js.map