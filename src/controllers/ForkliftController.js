import Forklift from "@/models/ForkliftModel";
import map from "@/models/MapModel";
import PackageController from "@/controllers/PackageController";
import AstarController from "@/controllers/AstarController";
import MapController from "@/controllers/MapController";
import neutral from "@/controllers/NeuralController";
import data from "../assets/data";

export default {
  forklift: [Forklift],
  move: function () {
    switch (Forklift.direction) {
      case "N":
        if (Forklift.x - 1 >= 0) {
          let x = Forklift.x - 1;
          let y = Forklift.y;
          if (map.grid[x][y].isPackage && Forklift.carry == null && map.grid[x][y].type != "smallstore" && map.grid[x][y].type != "bigstore") {
            Forklift.carry = map.grid[x][y];
            map.grid[x][y] = this.clear(x, y);
          } else if (map.grid[x][y].type != "floor" && !map.grid[x][y].isPackage && Forklift.carry != null && (Forklift.x - 1 == Forklift.carry.package.dest.x && Forklift.y == Forklift.carry.package.dest.y)) {
            map.grid[x][y] = Forklift.carry;
            PackageController.drop(Forklift.carry)
            Forklift.carry = null;
          } else if (!map.grid[x][y].isPackage) {
            if (x >= 12 && y < map.width / 2) {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.x = x;
            } else if (x >= 12 && y >= map.width / 2) {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.x = x;
            } else {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.x = x;
            }
          }
        }
        break;
      case "E":
        if (Forklift.y + 1 < map.width) {
          let x = Forklift.x;
          let y = Forklift.y + 1;
          //bierzemy paczke
          if (map.grid[x][y].isPackage && Forklift.carry == null && map.grid[x][y].type != "smallstore" && map.grid[x][y].type != "bigstore") {
            Forklift.carry = map.grid[x][y];
            map.grid[x][y] = this.clear(x, y);
          } else if (map.grid[x][y].type != ("floor") && !map.grid[x][y].isPackage && Forklift.carry != null && (Forklift.x == Forklift.carry.package.dest.x && Forklift.y + 1 == Forklift.carry.package.dest.y)) {
            map.grid[x][y] = Forklift.carry;
            PackageController.drop(Forklift.carry)
            Forklift.carry = null;
          } else if (!map.grid[x][y].isPackage) {
            if (x >= 12 && y < map.width / 2) {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.y = y;
            } else if (x >= 12 && y >= map.width / 2) {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.y = y;
            } else {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.y = y;
            }
          }
        }
        break;
      case "S":
        if (Forklift.x + 1 < map.height) {
          let x = Forklift.x + 1;
          let y = Forklift.y;
          if (map.grid[x][y].isPackage && Forklift.carry == null && map.grid[x][y].type != "smallstore" && map.grid[x][y].type != "bigstore") {
            Forklift.carry = map.grid[x][y];
            map.grid[x][y] = this.clear(x, y);
          } else if (map.grid[x][y].type != ("floor") && !map.grid[x][y].isPackage && Forklift.carry != null && (Forklift.x + 1 == Forklift.carry.package.dest.x && Forklift.y == Forklift.carry.package.dest.y)) {
            map.grid[x][y] = Forklift.carry;
            PackageController.drop(Forklift.carry)
            Forklift.carry = null;
          } else if (!map.grid[x][y].isPackage) {
            if (x >= 12 && y < map.width / 2) {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.x = x;
            } else if (x >= 12 && y >= map.width / 2) {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.x = x;
            } else {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.x = x;
            }
          }
        }
        break;
      case "W":
        if (Forklift.y - 1 >= 0) {
          let x = Forklift.x;
          let y = Forklift.y - 1;
          if (map.grid[x][y].isPackage && Forklift.carry == null && map.grid[x][y].type != "smallstore" && map.grid[x][y].type != "bigstore") {
            Forklift.carry = map.grid[x][y];
            map.grid[x][y] = this.clear(x, y);
          } else if (map.grid[x][y].type != ("floor") && !map.grid[x][y].isPackage && Forklift.carry != null && (Forklift.x == Forklift.carry.package.dest.x && Forklift.y - 1== Forklift.carry.package.dest.y)) {
            map.grid[x][y] = Forklift.carry;
            PackageController.drop(Forklift.carry)
            Forklift.carry = null;
          } else if (!map.grid[x][y].isPackage) {
            if (x >= 12 && y < map.width / 2) {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.y = y;
            } else if (x >= 12 && y >= map.width / 2) {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.y = y;
            } else {
              map.grid[Forklift.x][Forklift.y] = this.clear(Forklift.x, Forklift.y);
              Forklift.y = y;
            }
          }
        }
        break;
    }
    map.grid[Forklift.x][Forklift.y].isForklift = true
    MapController.grid()
  },
  turnRight: function () {
      switch (Forklift.direction) {
        case "N":
          Forklift.direction = "E";
          break;
        case "E":
          Forklift.direction = "S";
          break;
        case "S":
          Forklift.direction = "W";
          break;
        case "W":
          Forklift.direction = "N";
          break;
    }
  },
  turnLeft: function() {
      switch (Forklift.direction) {
        case "N":
          Forklift.direction = "W";
          break;
        case "E":
          Forklift.direction = "N";
          break;
        case "S":
          Forklift.direction = "E";
          break;
        case "W":
          Forklift.direction = "S";
          break;
      }
    },
  clear(x, y) {
    let field = ''
    if (x > 12 && y < 8) field = 'smallstore'
    else if (x > 12 && y > 8) field = 'bigstore'
    else if(x < 12) field = 'floor'
    return {
      type: field,
      x: x,
      y: y,
      cost: 1,
      isForklift: false,
      isPackage: false
    }
  },
  start() {
    if (MapController.packages.length > 0) {
      //console.log("Start")
      //console.log(Forklift.x + ', ' + Forklift.y)
      // while (PackageController.packages.length > 0) {
      let p = MapController.packages[0];
      p.dest = this.checkPackage(p);
      // console.log("Jade po paczke")
      // console.log(Forklift.x + ', ' + Forklift.y)
      this.action(AstarController.search(Forklift, p))
      // console.log(Forklift.x + ', ' + Forklift.y)
      // console.log("Odwoze paczke")
      // console.log(Forklift.x + ', ' + Forklift.y)
      this.action(AstarController.search(Forklift, p.dest))
      //console.log(Forklift.x + ', ' + Forklift.y)
      // }
    }
    return map.gridPub
  },
  action: function (actions) {
    actions.forEach(e => {
          if (e == "turn left") this.turnLeft()
          else if (e == "turn right")this.turnRight()
          else this.move()
    })
    return actions
  },
  checkPackage(p) {
    if (neutral.runNetwork(p.length, p.height, p.width) == "small") {
      p.size = "SMALL"
      for (let x = 15; x > 11; x--) {
        for (let y = 0; y < 8; y++) {
          if (!map.grid[x][y].isPackage && map.grid[x][y].type != 'floor' && map.grid[x][y].package == null) {
            let dest = {
              x: x,
              y: y
            }
            return dest;
          }
        }
      }
    } else {
      p.size = "BIG"
      for (let x = 15; x > 11; x--) {
        for (let y = 8; y < 16; y++) {
          if (!map.grid[x][y].isPackage && map.grid[x][y].type != 'floor' && map.grid[x][y].package == null) {
            let dest = {
              x: x,
              y: y
            }
            return dest;
          }
        }
      }
    }
  }
}