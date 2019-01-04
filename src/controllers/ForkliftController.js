import Forklift from "@/models/ForkliftModel";
import map from "@/models/MapModel";

export default {
  forklift: [Forklift],
  move: function() {
    switch (Forklift.direction) {
      case "N":
        if (Forklift.x - 1 >= 0) {
          let x = Forklift.x - 1;
          let y = Forklift.y;
          if (map.grid[x][y].type == "package" && Forklift.carry == null && x < 12) {
            Forklift.carry = map.grid[x][y];
            map.grid[x][y] = this.clear("floor", x, y);
          } else if (map.grid[x][y].type != ("floor" || "package") && Forklift.carry != null && x >= 12){
            map.grid[x][y] = Forklift.carry;
            Forklift.carry = null;
          } else if (map.grid[x][y].type != "package"){
            map.grid[Forklift.x][Forklift.y] = this.clear(map.grid[x][y].type, Forklift.x, Forklift.y);
            Forklift.x = x;
          }
        }
        break;
      case "E":
        if (Forklift.y + 1 < map.width) {
          let x = Forklift.x;
          let y = Forklift.y + 1;
          if (map.grid[x][y].type == "package" && Forklift.carry == null && x < 12) {
            Forklift.carry = map.grid[x][y];
            map.grid[x][y] = this.clear("floor", x, y);
          } else if (map.grid[x][y].type != ("floor" || "package") && Forklift.carry != null && x >= 12){
            map.grid[x][y] = Forklift.carry;
            Forklift.carry = null;
          } else if (map.grid[x][y].type != "package"){
            map.grid[Forklift.x][Forklift.y] = this.clear(map.grid[x][y].type, Forklift.x, Forklift.y);
            Forklift.y = y;
          }
        }
        break;
      case "S":
        if (Forklift.x + 1 < map.height) {
          let x = Forklift.x + 1;
          let y = Forklift.y;
          if (map.grid[x][y].type == "package" && Forklift.carry == null && x < 12) {
            Forklift.carry = map.grid[x][y];
            map.grid[x][y] = this.clear("floor", x, y);
          } else if (map.grid[x][y].type != ("floor" || "package") && Forklift.carry != null && x >= 12){
            map.grid[x][y] = Forklift.carry;
            Forklift.carry = null;
          } else if (map.grid[x][y].type != "package"){
            map.grid[Forklift.x][Forklift.y] = this.clear(map.grid[x][y].type, Forklift.x, Forklift.y);
            Forklift.x = x;
          }
        }
        break;
      case "W":
        if (Forklift.y - 1 >= 0) {
          let x = Forklift.x;
          let y = Forklift.y - 1;
          if (map.grid[x][y].type == "package" && Forklift.carry == null && x < 12) {
            Forklift.carry = map.grid[x][y];
            map.grid[x][y] = this.clear("floor", x, y);
          } else if (map.grid[x][y].type != ("floor" || "package") && Forklift.carry != null && x >= 12){
            map.grid[x][y] = Forklift.carry;
            Forklift.carry = null;
          } else if (map.grid[x][y].type != "package"){
            map.grid[Forklift.x][Forklift.y] = this.clear(map.grid[x][y].type, Forklift.x, Forklift.y);
            Forklift.y = y;
          }
        }
        break;
    }
    return [Forklift];
  },
  turn: function(direction) {
    if (direction > 0) {
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
    } else {
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
    }
    return [Forklift];
  },
  clear(type, x, y) {
    return {
      type: type,
      x: x,
      y: y
    };
  }
};
