class Map{

    constructor(width,height,tileWidth,tileHeight){
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.map = [[]];
    }

    getWidth(){
        return this.width;
    }
    
    getHeight(){
        return this.height;
    }

    getTileWidth(){
        return this.tileWidth;
    }
    
    getTileHeight(){
        return this.tileHeight;
    }


    getFullWidth(){
        return this.width * this.tileWidth;
    }
    
    getFullHeight(){
        return this.height * this.tileHeight;
    }

    initMap(){
        for(var x=0; x < this.tileWidth; x++){
            this.map[x]= [];
            for(var y=0;y < this.tileHeight; y++){
                if(y == this.tileWidth - 2)
                    this.map[x][y] = 7;
                else if(y == this.tileWidth - 1){
                    if(x < 5){
                        this.map[x][y] = 3;
                    }
                    else if(x >=5 && x < 10){
                        this.map[x][y] = 4;
                    }
                    else{
                        this.map[x][y] = 5;
                    }
                }
                else{
                    this.map[x][y] = 1;
                }
            }
        }
        this.map[15][14] = 1;
        this.map[15][15] = 1;

        return this.map;
    }
}

export default Map;