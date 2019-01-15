import map from "@/models/MapModel";

export default {
  packages: [],
  delivered: [],
  random() {
    let count = Math.floor(Math.random() * 5 + 4);
    while (count > 0) {
      let x = Math.floor(Math.random() * map.width + 0);
      let y = Math.floor(Math.random() * map.height + 0);
      let Package = {
        id: count,
        length: Math.floor(Math.random() * 100 + 1),
        height: Math.floor(Math.random() * 100 + 1),
        width: Math.floor(Math.random() * 100 + 1),
        x: x,
        y: y,
        cost: 1
      };
      if (map.grid[x][y].type == "floor") {
        map.grid[x][y] = Package;
        map.grid[x][y].type = "package";
        this.packages.push(map.grid[x][y]);
        count--;
      }
    }
    return this.packages;
  },
  drop: function (pkg) {
    let count = 0
    this.packages.forEach(e => {
      if (e.id == pkg.id) {
        this.packages.splice(count,1)
        this.delivered.push(pkg)
      }
      count++
    })
  }
};
