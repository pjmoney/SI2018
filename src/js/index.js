//SI2018

import Forklift from '../models/forklift.js';
import Map from '../models/map.js';
import Package from '../models/package.js';

let fl = new Forklift(5);
let config = new Map(32,32,16,16);
let map = config.initMap();

let packages = [];

var canvas = null;
var ctx = null;
var spritesheet = null;

var spritesheetLoaded = false;

function init(){
    canvas = document.getElementById('grid');

    canvas.width = config.getFullWidth();
    canvas.height = config.getFullHeight();

    ctx = canvas.getContext("2d");

    spritesheet = new Image();
    spritesheet.src = './src/img/sprites.png';
    spritesheet.onload = loaded;
}

function loaded()
{
    spritesheetLoaded = true;
    drawMap();
    spawnPackage(5);
    spawnForklift();
    
}

function drawMap(){
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let sprite = 1;
    
	for (var x=0; x < config.getTileWidth(); x++)
	{
		for (var y=0; y < config.getTileHeight(); y++)
		{
            switch(map[x][y]){
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
            
			ctx.drawImage(spritesheet,
			sprite*config.getWidth(), 0,
			config.getWidth(), config.getHeight(),
			x*config.getWidth(), y*config.getHeight(),
			config.getWidth(), config.getHeight());

		}
    }
}

function spawnPackage(count){
    let sprite = 2;
    
    for(var count; count > 0; count--){
        let x = Math.floor(Math.random() * 16);
        let y = Math.floor(Math.random() * 14);

        map[x][y] = sprite;

        ctx.drawImage(spritesheet,
        sprite*config.getWidth(), 0,
        config.getWidth(), config.getHeight(),
        x*config.getWidth(), y*config.getHeight(),
        config.getWidth(), config.getHeight());
    }
}

function spawnForklift(){
    let sprite = 0;

    let x = 15;
    let y = 15;

    map[x][y] = sprite;
    
    ctx.drawImage(spritesheet,
        sprite*config.getWidth(), 0,
        config.getWidth(), config.getHeight(),
        x*config.getWidth(), y*config.getHeight(),
        config.getWidth(), config.getHeight());
}

init();

console.log(map);