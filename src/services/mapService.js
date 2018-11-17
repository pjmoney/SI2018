import Map from '../models/map.js';

export default class mapService{
    constructor(width, height, tileWidth, tileHeight, canvas){
        this.map = new Map(width,height,tileWidth,tileHeight);
        this.canvas = canvas;
        this.ctx = null;
        this.sprites = null;
    }

    getWidth(){
        return this.map.width * this.map.tileWidth;
    }

    getHeight(){
        return this.map.height * this.map.tileHeight;
    }

    //update map
    setGrid(x,y,value){
        this.map.grid[x][y] = value;
    }

    //setmap
    initGrid(){
        for(var x=0; x < this.map.width; x++){
            this.map.grid[x]= [];
            for(var y=0;y < this.map.height; y++){
                if(y == this.map.width - 2)
                    this.setGrid(x,y,this.map.parts.garden)
                else if(y == this.map.width - 1){
                    if(x < 5){
                        this.setGrid(x,y,this.map.parts.food)
                    }
                    else if(x < 10){
                        this.setGrid(x,y,this.map.parts.building)
                    }
                    else{
                        this.setGrid(x,y,this.map.parts.agd)
                    }
                }
                else{
                    this.setGrid(x,y,this.map.parts.floor)
                }
            }
        }
            return this.map.grid;
    }

    //init drawing
    init(){
        console.log(this.initGrid());
        
        this.canvas.width = this.getWidth();
        this.canvas.height = this.getHeight();

        this.ctx = this.canvas.getContext("2d");

        this.sprites = new Image();
        this.sprites.src = './img/sprites.png';
        this.sprites.onload = function(){
        }; 
        this.drawMap();
    }

    drawMap(){
        let sprite = null;

        for(var x = 0; x < this.map.width; x++){
            for(var y = 0; y < this.map.height; y++){
                switch(this.map.grid[x][y]){
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

                this.redraw(x,y,sprite);
            }
        }
    }

    redraw(x,y,sprite){
        sprite;
        this.ctx.drawImage(
            this.sprites,
            sprite*this.map.tileWidth, 0,
            this.map.tileWidth, this.map.tileHeight,
            x*this.map.tileWidth,y*this.map.tileHeight,
            this.map.tileWidth, this.map.tileHeight
        );
    }
}