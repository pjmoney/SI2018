import map from "@/models/MapModel";

export default {
  packages: [],
  delivered: [],
  random() {
    let count = Math.floor(Math.random() * 5 + 10);
    while (count > 0) {
      let x = Math.floor(Math.random() * map.width + 0);
      let y = Math.floor(Math.random() * map.height + 0);
      let Package = {
        id: count,
        length: Math.floor(Math.random() * 20 + 1),
        height: Math.floor(Math.random() * 20 + 1),
        width: Math.floor(Math.random() * 20 + 1),
        x: x,
        y: y,
        dest: {
          x: 0,
          y: 0
        }
      };
      if (map.grid[x][y].type == "floor" && !map.grid[x][y].isForklift) {
        map.grid[x][y].package = Package;
        map.grid[x][y].isPackage = true;
        this.packages.push(map.grid[x][y].package);
        count--;
      }
    }
    return this.packages;
  },
  drop: function (pckg) {
    let count = 0
    let pkg = pckg.package
    this.packages.forEach(e => {
      if (e.id == pkg.id) {
        this.packages.splice(count,1)
        this.delivered.push(pkg)
      }
      count++
    })
  }
};
