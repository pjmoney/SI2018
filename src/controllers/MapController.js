import map from "@/models/MapModel";

export default {
  mapStyle: {
    width: map.width * map.tileWidth + "px",
    height: map.height * map.tileHeight + "px"
  },

  init() {
    let grid = [];
    for (let x = 0; x < map.height; x++) {
      for (let y = 0; y < map.width; y++) {
        let _grid = {
          x: x,
          y: y,
          component: "floor"
        };
        if (x >= map.height * (3 / 4) && y < map.width / 2) {
          _grid.component = "smallstore";
        } else if (x >= map.height * (3 / 4)) {
          _grid.component = "bigstore";
        }
        grid.push(_grid);
      }
    }
    grid[176].component = "forklift";
    return grid;
  }
};
