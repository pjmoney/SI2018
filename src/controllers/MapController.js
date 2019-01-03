import map from "@/models/MapModel";

export default {
  mapStyle: {
    width: map.width * map.cellWidth + "px",
    height: map.height * map.cellHeight + "px"
  },
  packages:[],

  grid: function() {
    let grid = [];
    for (let x = 0; x < map.height; x++) {
      for (let y = 0; y < map.width; y++) {
        grid.push(map.grid[x][y]);
      }
    }
    return grid;
  },

  init: function() {
    let grid = map.grid;
    for (let x = 0; x < map.height; x++) {
      grid[x] = [];
      for (let y = 0; y < map.width; y++) {
        let cell = {
          x: x,
          y: y,
          type: "floor"
        };
        if (x >= map.height * (3 / 4) && y < map.width / 2) {
          cell.type = "smallstore";
        } else if (x >= map.height * (3 / 4)) {
          cell.type = "bigstore";
        }
        grid[x][y] = cell;
      }
    }
    grid[11][0].type = "forklift";
    let random = Math.floor((Math.random()*12) + 4);
    let x = random;
    while(x > 0){
      let rand_x = Math.floor((Math.random()*map.width) + 0);
      let rand_y = Math.floor((Math.random()*map.height) + 0); 
      let Package = {
        id: x,
        length: Math.floor((Math.random()*100) + 1),
        height: Math.floor((Math.random()*100) + 1),
        width: Math.floor((Math.random()*100) + 1),
        x: rand_x,
        y: rand_y
      };
      if(grid[rand_x][rand_y].type == "floor"){
        grid[rand_x][rand_y] = Package;
        grid[rand_x][rand_y].type = "package";
        this.packages.push(grid[rand_x][rand_y])
        x--;
      }

      else {
        continue;
      }
      console.log(this.packages)
      console.log(`_Package No.${x}_\nDimensions:length: ${grid[rand_x][rand_y].length} height: ${grid[rand_x][rand_y].height} width: ${grid[rand_x][rand_y].width}\n---------------------------`)
    }
    map.grid = grid;
    return map.grid;
  }
};
