export default class Map{
    constructor(width, height, tileWidth, tileHeight){
        this.grid = [[]];

        this.width = width
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;

        this.parts = {
            forklift: 0,
            floor: 1,
            package: 2,
            food: 3,
            building: 4,
            agd: 5,
            garden: 7
        }
    }
}