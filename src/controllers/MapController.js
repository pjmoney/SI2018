import map from "@/models/MapModel";

export default {
  mapStyle: {
    width: map.width * map.cellWidth + "px",
    height: map.height * map.cellHeight + "px"
  },

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
    map.grid = grid;
    return map.grid;
  }
};
