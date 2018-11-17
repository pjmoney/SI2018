import MapService from './services/mapService.js';
import PackageService from './services/packageService.js';
import { watchFile } from 'fs';

let canvas = null;
let ctx = null;
let sprites = null;

//map dimensions
let map = {
    width: 16,
    height: 16,
    tileWidth: 32,
    tileHeight: 32
}

let mapService = new MapService(map.width,map.height,map.tileWidth,map.tileHeight);
let packageService = new PackageService();

//number of packages
let nop = 5;
let packages = packageService.randomPackage(nop,mapService.map);

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

function loaded(){
    mapService.drawMap();
    mapService.drawPackage(packages);
}
