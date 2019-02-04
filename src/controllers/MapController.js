import map from "@/models/MapModel";
import ForkliftController from "./ForkliftController";
import PackageController from "./PackageController";
import MainController from "@/controllers/MainController"

// function generatePackagesArrayFromGrid(phenotype){
//   let packageArray = []
//   for(let x = 0; x < 12; x++){
//     for(let y = 0; x < 16; y++){
//       console.log('zamieniam grida na paczki')
//       console.log(phenotype.grid[x][y])
//       if (phenotype.grid[x][y].isPackage) {
//           packageArray.push(phenotype.grid[x][y].package)
//     }
//   }
// }
// return packageArray
// }

export default {
  mapStyle: {
    width: map.width * map.cellWidth + "px",
    height: map.height * map.cellHeight + "px"
  },
  ai : '',
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
  generateMap: function() {
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
    map.grid = grid;
   
  },
  init: function() {
    if(MainController.genetic){
      console.log(MainController.genetic)
      this.packages = PackageController.startGenetic(200,20,10)
      this.setMap(this.packages)
    } else {
     console.log(MainController.genetic)
      this.setMap(PackageController.random());
    }
  },
  clearMapv1: function() {
    this.generateMap()
    console.log('MAPA WYCZYSZCZONA')
  },
  //clear map to default state
  clearMapv2: function(grid) {
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
  },
  
  //set new elements on map
  setMap: function(grid) {
    grid.forEach(e => {
      if (e.type == "forklift") map.grid[e.x][e.y].isForklift = true;
      if (e.type == "package") map.grid[e.x][e.y].isPackage = true;
    });
    this.grid();
  }
}

