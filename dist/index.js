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
//# sourceMappingURL=index.js.map