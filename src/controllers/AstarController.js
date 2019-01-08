export default {
  search: function(forklift, packages) {
    let distances = []

    packages.forEach(e => {
      distances.push(this.distance(forklift, e))
    })

    distances.sort(this.compareNumbers)
    return distances
  },
  distance: function(forklift, pkg){
    let x = Math.abs(forklift.x - pkg.x)
    let y = Math.abs(forklift.y - pkg.y)

    return x + y;
  },
  compareNumbers: function(a, b) {
   return a - b
}

}
