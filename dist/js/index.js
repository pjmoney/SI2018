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

        redraw(sprite, x, y);
    }
}

function spawnForklift() {
    var sprite = 0;

    var x = 15;
    var y = 15;

    redraw(sprite, x, y);
}

function redraw(sprite, x, y) {
    map[x][y] = sprite;

    ctx.drawImage(spritesheet, sprite * config.getWidth(), 0, config.getWidth(), config.getHeight(), x * config.getWidth(), y * config.getHeight(), config.getWidth(), config.getHeight());
}

init();

console.log(map);
//# sourceMappingURL=index.js.map