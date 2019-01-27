import map from "@/models/MapModel";
import forklift from "@/models/ForkliftModel"

export default {
  openList: [],
  closedList: [],
  init: function(map) {
    let grid = [[]]
    for (var x = 0; x < map.length; x++) {
      grid[x] = []
      for (var y = 0; y < map[x].length; y++) {
        let gridPat = {
          cost: map[x][y].cost,
          f: 0,
          g: 0,
          h: 0,
          parent: null,
          visited: false,
          closed: false,
          isPackage: map[x][y].isPackage,
          x: x,
          y: y
        }
        grid[x][y] = gridPat
      }
    }
    return grid
  },
  search: function(start, end) {
    let grid = this.init(map.grid)
    grid[end.x][end.y].isPackage = false
    this.openList.push(start)
    while (this.openList.length > 0) {
      let lowInd = 0
      for (let i = 0; i < this.openList.length; i++) {
        if (this.openList[i].f < this.openList[lowInd].f) lowInd = i
      }
      let currentNode = this.openList[lowInd]

      if (currentNode.x == end.x && currentNode.y == end.y) {
        let curr = currentNode;
        let pos = {
          x: forklift.x,
          y: forklift.y
        }
        let ret = [];
        while (curr.parent) {
          ret.push(curr);
          curr = curr.parent;
        }
        this.closedList = []
        this.openList = []
        ret.push(pos)
        ret = ret.reverse()
        return this.actions(ret);
      }
      this.openList.splice(lowInd, 1)
      currentNode.closed = true
      let neighbors = this.neighbors(grid, currentNode)

      for (var i=0; i<neighbors.length;i++) {
        var neighbor = neighbors[i];
        if (neighbor.closed || neighbor.isPackage) {
          continue;
        }
        var gScore = currentNode.g + neighbor.cost;
        var gScoreIsBest = false;
        if(!neighbor.visited) {
          gScoreIsBest = true;
          neighbor.h = this.distance(neighbor, end);
          neighbor.visited = true
          this.openList.push(neighbor);
        } else if(gScore < neighbor.g) {
          gScoreIsBest = true;
        }
        if (gScoreIsBest) {
          neighbor.parent = currentNode;
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
        }
      }
    }
    return []
  },
  distance: function(start, end){
    let x = Math.abs(start.x - end.x)
    let y = Math.abs(start.y - end.y)
    return x + y;
  },
  neighbors: function(grid, node) {
    let ret = []
    let x = node.x;
    let y = node.y;
    if (grid[x-1] && grid[x-1][y]) {
      ret.push(grid[x-1][y]);
    }
    if (grid[x+1] && grid[x+1][y]) {
      ret.push(grid[x+1][y]);
    }
    if (grid[x][y-1] && grid[x][y-1]) {
      ret.push(grid[x][y-1]);
    }
    if (grid[x][y+1] && grid[x][y+1]) {
      ret.push(grid[x][y+1]);
    }
    return ret;
  },
  actions: function(ret) {
    let actions = []
    let dir = forklift.direction
    for(let i = 0; i < ret.length; i++){
      if (i + 1 >= ret.length) return actions
      switch(dir){
        case "E":
          if (ret[i + 1].x < ret[i].x) {
            actions.push("turn left")
            actions.push("move")
            dir = "N"
          } else if (ret[i + 1].x > ret[i].x) {
            actions.push("turn right")
            actions.push("move")
            dir = "S"
          } else {
            if (ret[i + 1].y > ret[i].y) actions.push("move")
            else {
              actions.push("turn right")
              actions.push("turn right")
              actions.push("move")
              dir = "W"
            }
          }
          break
        case "N":
          if (ret[i + 1].x < ret[i].x) {
            actions.push("move")
          } else if (ret[i + 1].x > ret[i].x) {
            actions.push("turn right")
            actions.push("turn right")
            actions.push("move")
            dir = "S"
          } else {
            if (ret[i + 1].y > ret[i].y) {
              actions.push("turn right")
              actions.push("move")
              dir = "E"
            } else {
              actions.push("turn left")
              actions.push("move")
              dir = "W"
            }
          }
          break
        case "S":
          if (ret[i + 1].x < ret[i].x) {
            actions.push("turn right")
            actions.push("turn right")
            actions.push("move")
            dir = "N"
          } else if (ret[i + 1].x > ret[i].x) {
            actions.push("move")
          } else {
            if (ret[i + 1].y > ret[i].y) {
              actions.push("turn left")
              actions.push("move")
              dir = "E"
            } else {
              actions.push("turn right")
              actions.push("move")
              dir = "W"
            }
          }
          break
        case "W":
          if (ret[i + 1].x < ret[i].x) {
            actions.push("turn right")
            actions.push("move")
            dir = "N"
          } else if (ret[i + 1].x > ret[i].x) {
            actions.push("turn left")
            actions.push("move")
            dir = "S"
          } else {
            if (ret[i + 1].y > ret[i].y) {
              actions.push("turn left")
              actions.push("turn left")
              actions.push("move")
              dir = "E"
            } else{
              actions.push("move")
            }
          }
          break
      }
    }
    return actions
  }
};
