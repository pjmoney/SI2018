import map from "@/models/MapModel";
import ForkliftController from "./ForkliftController";
import PackageController from "./PackageController";

export default {
  mapStyle: {
    width: map.width * map.cellWidth + "px",
    height: map.height * map.cellHeight + "px"
  },
  packages: [],

  grid: function() {
    let grid = [];
    for (let x = 0; x < map.height; x++) {
      for (let y = 0; y < map.width; y++) {
        grid.push(map.grid[x][y]);
      }
    }
    map.gridPub = grid;
  },

  init: function() {
    let grid = map.grid;
    for (let x = 0; x < map.height; x++) {
      grid[x] = [];
      for (let y = 0; y < map.width; y++) {
        let cell = {
          x: x,
          y: y,
          type: "floor",
          cost: Math.floor(Math.random() * 3 + 1),
          isForklift: false,
          isPackage: false
        };
        if (x >= map.height * (3 / 4) && y < map.width / 2) {
          cell.type = "smallstore";
        } else if (x >= map.height * (3 / 4)) {
          cell.type = "bigstore";
        }
        grid[x][y] = cell;
      }
    }
    this.setMap(ForkliftController.forklift);
    this.setMap(PackageController.random());
    map.grid = grid;
  },
  //set new elements on map
  setMap: function(grid) {
    grid.forEach(e => {
      if (e.type == "forklift") map.grid[e.x][e.y].isForklift = true;
      if (e.type == "package") map.grid[e.x][e.y].isPackage = true;
    });
    this.grid();
  }
};
