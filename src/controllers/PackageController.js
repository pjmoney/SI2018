import map from "@/models/MapModel";
import MapController from "@/controllers/MapController";
import ForkliftController from "@/controllers/ForkliftController"
//GAC
const GAConstructor = require('geneticalgorithm')
//------------------------------------------------

const contents = ["Food", "Chemicals", "Clothes", "Furnitures", "Cosmetics", "Books"]

const MAX_PACKAGES_PER_MAP = 80
const MUTATION_REMOVE_PACKAGE_PERCENTAGE = 20
const MIN_PACKAGES_PER_MAP = 10

let phenotype = {
  grid: map.grid,
  //!packages: []
}

function returnPointsForPhenotypes() {

}


function generatePackagesArrayFromGrid(phenotype) {
  let packageArray = []
  for (let x = 0; x < 11; x++) {
    for (let y = 0; y < 16; y++) {
      //console.log('zamieniam grida na paczki')
      //console.log(phenotype.grid[x][y])
      if (phenotype.grid[x][y].isPackage) {
        phenotype.grid[x][y].package.id = makeid(4)
        packageArray.push(phenotype.grid[x][y].package)
      }
    }
  }
  //Returns package array
  return packageArray
}


//MPI = Max Packages Per Individual - default 40
function randomPhenotype(MPI = 30) {
  if (MPI > 75) {
    return console.error('Cannot create more than 75 packages');

  }
  MapController.generateMap()
  let phen = {
    grid: JSON.parse(JSON.stringify(phenotype.grid)),
    //!packages: JSON.parse(JSON.stringify(phenotype.packages))
  }
  let count = Math.floor(Math.random() * MPI + MIN_PACKAGES_PER_MAP);
  while (count > 0) {
    let x = Math.floor(Math.random() * 11 + 0);
    let y = Math.floor(Math.random() * map.height + 0);
    if (phen.grid[x][y].type == "floor" && !phen.grid[x][y].isForklift && !phen.grid[x][y].isPackage) {
      phen.grid[x][y].package = randomPackage(x, y);
      phen.grid[x][y].isPackage = true;
      //!phen.packages.push(phen.grid[x][y].package)
      count--;
    }
  }

  return phen
}

function randomPackage(posx, posy) {

  let pkg = {
    //DO NOT GENERATE ID YET
    id: makeid(4),
    length: Math.floor(Math.random() * 20 + 1),
    height: Math.floor(Math.random() * 20 + 1),
    width: Math.floor(Math.random() * 20 + 1),
    content: contents[Math.floor(Math.random() * contents.length + 0)],
    x: posx,
    y: posy,
    dest: {
      x: 0,
      y: 0
    }
  }
  return pkg
}
// Default points = 0, if found bad neighbour point += 1
// If there is not bad neigbours it returns 0, otherwise increases 1 point each bad neighbour
function checkNeighbours(x, y, array, content, distance = 1) {
  if (distance > 3) distance = 3
  let points = 0 // Maximum distance is 3 -> worst case 48 points
  let neigboursArray = []
  for (let tempx = x - distance; tempx <= x + distance; tempx++) {
    for (let tempy = y - distance; tempy <= y + distance; tempy++) {
      if (tempx == x && tempy == y) continue
      if (tempx >= 0 && tempx <= 11 && tempy >= 0 && tempy <= 15) {
        if (array[tempx][tempy].isPackage) {
          if (array[tempx][tempy].package.content === content) {
            points += 1
          }
        }
      }
    }
  }
  return points
}

function deletePackageFromArray(x, y, myArray) {
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i].x === x) {
      if (myArray[i].y === y) {
        myArray.splice(i, 1)
      }
    }
  }
}

function makeid(length) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let date = new Date()
  date = date.getMilliseconds()
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    if (i % 3 == 0) text += "/"
  }

  text += date

  return text;
}

export default {
  packages: [],
  delivered: [],
  startPopulation: [],
  populationSize: 0,

  random() {
    MapController.generateMap()
    let count = Math.floor(Math.random() * 6 + 4);
    while (count > 0) {
      let x = Math.floor(Math.random() * map.width + 0);
      let y = Math.floor(Math.random() * map.height + 0);
      let Package = {
        //id: makeid(4),
        length: Math.floor(Math.random() * 10 + 1),
        height: Math.floor(Math.random() * 10 + 1),
        width: Math.floor(Math.random() * 10 + 1),
        content: contents[Math.floor(Math.random() * contents.length + 0)],
        x: x,
        y: y,
        dest: {
          x: 0,
          y: 0
        }
      };
      if (map.grid[x][y].type == "floor" && !map.grid[x][y].isForklift && !map.grid[x][y].isPackage) {
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
      
        this.packages.splice(count, 1)
        this.delivered.push(pkg)
      }
      count++
    })
  },
  randomGeneticStartPopulation(populationSize, MPI = 40) {
    while (populationSize > 0) {
      this.startPopulation.push(randomPhenotype(MPI, this.phenotype))
      //map.grid = phen.grid
      //MapController.setMap(phen.grid)  
      populationSize--
    }
    this.populationSize = this.startPopulation.length
    console.log('Populacja startowa: ' + this.populationSize + ' osobników')
    console.log(this.startPopulation)
  },
  // Simple mutation - place random packages around the map or remove one
  mutation(phenotype) {
    let child = JSON.parse(JSON.stringify(phenotype))
    let temp = JSON.parse(JSON.stringify(phenotype))
    let x = Math.floor(Math.random() * 10 + 0)
    let y1 = Math.floor(Math.random() * map.height + 0)
    let y2 = Math.floor(Math.random() * map.height + 0)
    child.grid[x][y1] = child.grid[x][y2]
    child.grid[x][y2] = temp.grid[x][y1]
    let randomPercentage = Math.random()
    //console.log('LOSUJE - ' + randomPercentage)
    if (randomPercentage <= MUTATION_REMOVE_PACKAGE_PERCENTAGE / 100) {
      let w, h = 0
      //console.log('USUWAM - WYLOSOWANO ' + randomPercentage)
      do {
        w = Math.floor(Math.random() * 10 + 0)
        h = Math.floor(Math.random() * map.height + 0)
      } while (!child.grid[w][h].isPackage)
      child.grid[w][h].isPackage = false
      child.grid[w][h].package = null
      return child
    }
    return child
  },
  //
  /*
    ?Fitness function - it defines which phenotypes are be able to survive (survival of the fittest).
    =========================================================================================================
    ||Several known conditions:
    =========================================================================================================
    ||Content        |     Can be neighbour                            |  Cannot be neighbour(min. distance)
    =========================================================================================================
    ||FOOD           |     Furnitures, FOOD                            |  Clothes(1), Chemicals(2), Books(1), Cosmetics(2)
    ---------------------------------------------------------------------------------------------------------
    ||CHEMICALS      |     Furnitures, CHEMICALS                       |  Books(2), Cosmetics(1), Clothes(1), Food(2)
    ---------------------------------------------------------------------------------------------------------
    ||CLOTHES        |     Books, Furnitures, CLOTHES                  |  Cosmetics(1), Food(1), Chemicals(1)
    ---------------------------------------------------------------------------------------------------------
    ||FURNITURES     |Books,FURNITURES,CLOTHES,Cosmetics,Food,Chemicals|  
    ---------------------------------------------------------------------------------------------------------
    ||COSMETICS      |     Books, Furnitures, COSMETICS                | Food(2), Chemicals(1), Clothes(1)
    ---------------------------------------------------------------------------------------------------------
    ||BOOKS          |     BOOKS, Furnitures, Clothes, Cosmetics       | Food(1), Chemicals(2)
  */
  fitness(phenotype) {
    //console.log('sprawdzam fenotyp')
    let fitness = 0
    //!console.log(phenotype.packages)
    //console.log(phenotype.grid)
    // let packages = JSON.parse(JSON.stringify(phenotype.packages))
    // let grid = JSON.parse(JSON.stringify(phenotype.grid))
    for (let tempx = 0; tempx < 12; tempx++) {
      for (let tempy = 0; tempy < 16; tempy++) {
        if (phenotype.grid[tempx][tempy].isPackage) {
          if (phenotype.grid[tempx][tempy].package.content == 'Food') {
            if (checkNeighbours(tempx, tempy, phenotype.grid, 'Chemicals', 2) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Chemicals', 2)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Clothes', 1) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Clothes', 1)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Cosmetics', 2) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Cosmetics', 2)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Books', 1) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Books', 1)
            } else {

              fitness += 10
            }
          }
          if (phenotype.grid[tempx][tempy].package.content == 'Chemicals') {
            if (checkNeighbours(tempx, tempy, phenotype.grid, 'Food', 2) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Food', 2)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Clothes', 1)) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Clothes', 1)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Cosmetics', 1)) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Cosmetics', 1)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Books', 2) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Books', 2)
            } else {
              fitness += 10
            }
          }
          if (phenotype.grid[tempx][tempy].package.content == 'Clothes') {
            if (checkNeighbours(tempx, tempy, phenotype.grid, 'Food', 1) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Food', 1)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Chemicals', 1)) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Chemicals', 1)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Cosmetics', 1)) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Cosmetics', 1)
            } else {
              fitness += 10
            }
          }
          if (phenotype.grid[tempx][tempy].package.content == 'Furnitures') {
            fitness += 10
          }
          if (phenotype.grid[tempx][tempy].package.content == 'Cosmetics') {
            if (checkNeighbours(tempx, tempy, phenotype.grid, 'Food', 2) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Food', 2)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Chemicals', 1) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Chemicals', 1)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Clothes', 1) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Clothes', 1)
            }
          }
          if (phenotype.grid[tempx][tempy].package.content == 'Books') {
            if (checkNeighbours(tempx, tempy, phenotype.grid, 'Food', 1) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Food', 1)
            } else if (checkNeighbours(tempx, tempy, phenotype.grid, 'Chemicals', 2) > 0) {
              fitness -= checkNeighbours(tempx, tempy, phenotype.grid, 'Chemicals', 2)
            } else {
              fitness += 10
            }
          }
        }
      }
    }
    //console.log('KONCZE SPRAWDZANIE FENOTYPU')
    return fitness
  },
  // Crossover operation - take random part of each phenotype and combine them together to create children
  cross(phenotype1, phenotype2) {
    let x = 0
    let y = 0
    let side = 0
    let isFit = false
    let child1 = JSON.parse(JSON.stringify(phenotype1))
    let child2 = JSON.parse(JSON.stringify(phenotype2))

    while (!isFit) {
      x = Math.floor(Math.random() * 10 + 0);
      y = Math.floor(Math.random() * map.height + 0)
      side = Math.floor(Math.random() * 4 + 1)
      if ((x + side) <= 10 && (x - side) >= 0) { // Check if x >= 0 and x <= 10
        if ((y + side) <= 15 && (y - side) >= 0) { // Check if y >= 0 and y <= 15
          isFit = true
        }
      }
    }
    // Making Child1
    for (let w = x + side; w >= x; w--) {
      for (let h = y + side; h >= x; h--) {
        if (child1.grid[w][h].type == 'floor') {
          if (child1.grid[w][h].isPackage && child2.grid[w][h].isPackage) {
            //!deletePackageFromArray(w, h, child1.packages)
            child1.grid[w][h].package = child2.grid[w][h].package
            //!child1.packages.push(child1.grid[w][h].package)
          } else if (!child1.grid[w][h].isPackage && child2.grid[w][h].isPackage) {
            child1.grid[w][h].package = child2.grid[w][h].package
            //!child1.packages.push(child1.grid[w][h].package)
          } else if (child1.grid[w][h].isPackage && !child2.grid[w][h].isPackage) {
            //!deletePackageFromArray(w, h, child1.packages)
            child1.grid[w][h].isPackage = false
            child1.grid[w][h].package = ''

          }
        }

        child1.grid[w][h] = child2.grid[w][h]
      }
    }
    //Making Child2
    for (let w = x - side; w <= x; w++) {
      for (let h = y - side; h <= x; h++) {

        if (child2.grid[w][h].isPackage && child1.grid[w][h].isPackage) {
          //!deletePackageFromArray(w, h, child2.packages)
          child2.grid[w][h].package = child1.grid[w][h].package
          //!child2.packages.push(child2.grid[w][h].package)
        } else if (!child2.grid[w][h].isPackage && child1.grid[w][h].isPackage) {
          child2.grid[w][h].package = child1.grid[w][h].package
          //!child2.packages.push(child2.grid[w][h].package)
        } else if (child2.grid[w][h].isPackage && !child1.grid[w][h].isPackage) {
          //!deletePackageFromArray(w, h, child2.packages)
          child2.grid[w][h].package = null
          child2.grid[w][h].isPackage = false
        }

        child2.grid[w][h] = child1.grid[w][h]
      }
    }
    return [child1, child2]
  },

  //Start main Genetic Algorithm
  startGenetic(bestScore = 100, population = 20, MPI = MAX_PACKAGES_PER_MAP) {
    if (MPI > MAX_PACKAGES_PER_MAP) {
      return console.error('Packages limit per map: ' + MAX_PACKAGES_PER_MAP + '\nYour number of packages: ' + MPI)
    } else {
      this.randomGeneticStartPopulation(population, MPI)
      let lastBestScore = 0
      let counter = 0
      //Standard lib config
      let config = {
        mutationFunction: this.mutation,
        fitnessFunction: this.fitness,
        crossoverFunction: this.cross,
        population: this.startPopulation,
        populationSize: this.populationSize
      }
      let time1 = Date.now()
      console.time('ga')
      console.log('- STARTUJE ALGORYTM -')
      let geneticAI = new GAConstructor(config)

      while (geneticAI.bestScore() < bestScore) {
        console.log("Generacja " + counter + ' / ' + geneticAI.bestScore())
        geneticAI.evolve()
        counter++
      }
      console.log('Najlepszy wynik ' + geneticAI.bestScore())

      console.log('Cala populacja:')
      console.log(geneticAI.scoredPopulation())  
      console.log('KONIEC ALGORYTMU - minęło ' + (Date.now() - time1)/1000 + ' sekund')
      MapController.setMap(ForkliftController.forklift);
      map.grid = geneticAI.best().grid
      this.packages = generatePackagesArrayFromGrid(map)

      console.log(this.packages)
      //this.packages = generatePackagesArrayFromGrid(map)
      return this.packages
    }
  }
}