import Map from '../models/map.js';

export default class mapService{
    constructor(width, height, tileWidth, tileHeight){
        this.map = new Map(width,height,tileWidth,tileHeight);
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

    //init map
    init(){
        let min = Math.round(this.map.width * 0.25);
        let max = Math.round(this.map.height * 0.75) - 1;

        for(var x=0; x < this.map.width; x++){
            this.map.grid[x]= [];
            for(var y=0;y < this.map.height; y++){
                if(y > max){
                    if(x < min)
                        this.setGrid(x,y,this.map.parts.agd)
                    else if(x < min*2)
                        this.setGrid(x,y,this.map.parts.building)
                    else if(x > max)
                        this.setGrid(x,y,this.map.parts.garden)
                    else
                        this.setGrid(x,y,this.map.parts.food)
                }
                else
                    this.setGrid(x,y,this.map.parts.floor)
            }
        }
        console.log(this.map.grid)    
        return this.map.grid;
    }

    //draw base map
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

    //redraw point
    redraw(x,y,sprite){
        this.ctx.drawImage(
            this.sprites,
            sprite*this.map.tileWidth, 0,
            this.map.tileWidth, this.map.tileHeight,
            x*this.map.tileWidth,y*this.map.tileHeight,
            this.map.tileWidth, this.map.tileHeight
        );
    }

    //draw package
    drawPackage(packages, store){
        console.log(packages);

        for(var x = 0; x < packages.length; x++){
            this.setGrid(packages[x].position.x, packages[x].position.y, this.map.parts.package);
            this.redraw(packages[x].position.x, packages[x].position.y, this.map.parts.package);

            var li = document.createElement('li');
            store.appendChild(li);

            li.innerHTML += 'Package (' + 
            packages[x].width + 'x' + 
            packages[x].length + 'x' + 
            packages[x].height + ', ' +
            packages[x].weight + ' kg' +
            ' x: ' + packages[x].position.x + 
            ' y: ' + packages[x].position.y + ')';
        }
    }
}