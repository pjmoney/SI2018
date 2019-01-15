import map from "@/models/MapModel";
//https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
export default {
  fringe: [],
  explored: [],
  ret:[],
  search: function(current, target) {
    current.f = this.distance(current,target) + map.grid[current.x][current.y].cost
    current.g = map.grid[current.x][current.y].cost
    current.h = this.distance(current,target)
    this.fringe.push(current)
    while (this.fringe.length > 0){
      console.log("Petla:", this.fringe.length)
      let low = 0;
      for(let i = 0; i < this.fringe.length; i++){
        if(this.fringe[i].f < this.fringe[low].f) { low = i }
      }
      let currentNode = this.fringe[low]
      if(currentNode.x == target.x && currentNode.y == target.y) {
        console.log(currentNode)
        console.log("Jestem na miejscu")
        this.fringe = []
        this.explored = []
        this.ret = []
        return this.ret.reverse();
      }
      console.log("usuwam node z fringe")
      this.removeFringe(currentNode)
      console.log("dodaje node do explored")
      this.explored.push(currentNode)

      console.log("szukam sasiadow")
      let neighbors = this.findNeigh(currentNode)

      for(var i=0; i<neighbors.length;i++) {
        var neighbor = neighbors[i];
        if(this.findExplored(neighbor)) {
          console.log("sasiad jest w explored")
          // not a valid node to process, skip to next neighbor
          continue;
        }
        // g score is the shortest distance from start to current node, we need to check if
        //   the path we have arrived at this neighbor is the shortest one we have seen yet
        var gScore = this.distance(current, currentNode) + 1; // 1 is the distance from a node to it's neighbor
        console.log("wyliczam gscore",gScore)
        var gScoreIsBest = false;

        if(!this.findFringe(neighbor)) {
          // This the the first time we have arrived at this node, it must be the best
          // Also, we need to take the h (heuristic) score since we haven't done so yet
          gScoreIsBest = true;
          neighbor.h = this.distance(neighbor, target);
          console.log("wyliczam distance do targeta z sasiada",neighbor.h)
          this.fringe.push(neighbor);
        }
        else if(gScore < neighbor.g) {
          // We have already seen the node, but last time it had a worse g (distance from start)
          console.log("gscore mniejsze niz neibor.g",gScore)
          gScoreIsBest = true;
        }

        if(gScoreIsBest) {
          // Found an optimal (so far) path to this node.   Store info on how we got here and
          //  just how good it really is...
          console.log("ustawiam rodzica sasiada na aktualny node")
          neighbor.parent = currentNode;
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
        }
      }
    }
    return []
  },
  distance: function(forklift, pkg){
    let x = Math.abs(forklift.x - pkg.x)
    let y = Math.abs(forklift.y - pkg.y)
    return x + y;
  },
  compareNumbers: function(a, b) {
   return a - b
 },
 findNeigh: function(node) {
    let ret = []
    let x = node.x;
    let y = node.y;

    if(map.grid[x-1] && map.grid[x-1][y]) {
      ret.push(map.grid[x-1][y]);
    }
    if(map.grid[x+1] && map.grid[x+1][y]) {
      ret.push(map.grid[x+1][y]);
    }
    if(map.grid[x][y-1] && map.grid[x][y-1]) {
      ret.push(map.grid[x][y-1]);
    }
    if(map.grid[x][y+1] && map.grid[x][y+1]) {
      ret.push(map.grid[x][y+1]);
    }
    return ret;
 },
 removeFringe: function(node){
   let count = 0
   this.fringe.forEach(e => {
     if (e.x == node.x && e.y == node.y) {
       this.fringe.splice(count,1)
     }
     count++
   })
 },
 findExplored: function(node){
   let count = 0
   this.explored.forEach(e => {
     if (e.x == node.x && e.y == node.y) {
       return true
     }
     count++
   })
 },
 findFringe: function(node){
   let count = 0
   this.fringe.forEach(e => {
     if (e.x == node.x && e.y == node.y) {
       return true
     }
     count++
   })
 }
};
