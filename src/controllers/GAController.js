const GAConstructor = require('geneticalgorithm')
import PackageController from "@/controllers/PackageController"
import MapController from "@/controllers/MapController"
import map from "@/models/MapModel";



let startPopulation = PackageController.packages
let populationSize = startPopulation.length
//Podstawowa konfiguracja biblioteki
let config = {
    mutationFunction: mutation,
    fitnessFunction: fitness,
    crossoverFunction: cross,
    population: startPopulation,
    populationSize: populationSize
}

export default function setConfig(pkgs){
    startPopulation = pkgs
    console.log(startPopulation)
}

function volume (height, width, length) {
    return height * width * length
}
// let particularDocks = {
//     chemDock : 11,
//     clothDock : 8,
//     foodDock : 5
// }

function mutation (parent) {

    // let rand_y = 0
    // let rand_x = 0

    // do {
    //     rand_y = array[Math.floor(Math.random() * array.length)]
    //     rand_x = Math.floor(Math.random() * 4 + 0)
    // } while (!map.grid[rand_x][rand_y].isPackage);

    // pkg.x = rand_x
    // pkg.y = rand_y
    let child_width = 0
    let child_height = 0
    let child_length = 0

    if(parent.height < 13){
        child_height = parent.height + Math.floor(Math.random() * 7 + 1)
    } else {
        child_height = parent.height - Math.floor(Math.random() * 3 + 2)
    }

    if(parent.width > 13){
        child_width = parent.width - Math.floor(Math.random() * 2 + 1)
    } else {
        child_width = parent.width + Math.floor(Math.random() * 5 + 3)
    }

    if(parent.length > 15){
        child_length = parent.length - Math.floor(Math.random() * 10 + 4)
    } else {
        child_length = parent.length + Math.floor(Math.random() * 4 + 1)
    }
    let child = {
        width: child_width,
        height: child_height,
        length: child_length
    }

    return child


}

function cross (parent1, parent2) {
    let child1 = {
        input: [parent1.width, parent1.height, parent2.length]
    }
    let child2 = {
        input: [parent2.height, parent2.length, parent1.height]
    }

    return [child1, child2]
}

function fitness (parent) {
    let fitness = volume(parent.width, parent.height, parent.length) / 1000

    // if(pkg.content == "Chemicals" && (map.grid[pkg.x-1][pkg.y].content == "Food" || map.grid[pkg.x+1][pkg.y].content == "Food") ){
    //     return fitness
    // }

    // if(pkg.content == "Food" && (map.grid[pkg.x-1][pkg.y].content == "Chemicals" || map.grid[pkg.x+1][pkg.y].content == "Chemicals")){
    //     return fitness
    // }

    // return fitness + 1000
    if (fitness > 2){
        return fitness
    } else { return 0 }

}



// let counter = 0


// while(counter < 5){
//     console.log(geneticAI.best())
//     console.log(geneticAI.bestScore())
//     geneticAI.evolve()
//     console.log('----------------------')
//     counter ++
// }

//=========================================================================================
//PACKAGE CONTROLLER
//=========================================================================================

//
  //
  // ALGORYTM GENETYCZNY
  //
  //

  spawnOnlyBig() {
    //stworz skrzynki
    let count = Math.floor(Math.random() * 50 + 10);
    while (count > 0) {
      let x = Math.floor(Math.random() * map.width + 0);
      let y = Math.floor(Math.random() * map.height + 0);
      let Package = {
        id: makeid(4),
        length: Math.floor(Math.random() * 10 + 1),
        height: Math.floor(Math.random() * 10 + 1),
        width: Math.floor(Math.random() * 10 + 1),
        content: contents[Math.floor(Math.random() * 2 + 0)],
        x: x,
        y: y,
        dest: {
          x: 0,
          y: 0
        }
      }
      if (map.grid[x][y].type == "floor" && !map.grid[x][y].isForklift) {
        this.temp.push(Package)
      }
      count--;
    }
    let startPopulation = this.temp
    let populationSize = startPopulation.length
    //Podstawowa konfiguracja biblioteki
    let config = {
      mutationFunction: mutation,
      fitnessFunction: fitness,
      crossoverFunction: cross,
      population: startPopulation,
      populationSize: populationSize
    }

    function volume(height, width, length) {
      return height * width * length
    }

    function mutation(parent) {

      let child_width = 0
      let child_height = 0
      let child_length = 0

      if (parent.height < 13) {
        child_height = parent.height + Math.floor(Math.random() * 7 + 1)
      } else {
        child_height = parent.height - Math.floor(Math.random() * 3 + 2)
      }

      if (parent.width > 13) {
        child_width = parent.width - Math.floor(Math.random() * 2 + 1)
      } else {
        child_width = parent.width + Math.floor(Math.random() * 5 + 3)
      }

      if (parent.length > 15) {
        child_length = parent.length - Math.floor(Math.random() * 10 + 4)
      } else {
        child_length = parent.length + Math.floor(Math.random() * 4 + 1)
      }

      let child = {
        id: makeid(10),
        width: child_width,
        height: child_height,
        length: child_length,
        content: parent.content,
        x: Math.floor(Math.random() * map.width + 0),
        y: Math.floor(Math.random() * map.height + 0),
        dest: {
          x: 0,
          y: 0
        }
      }

      return child


    }

    function cross(parent1, parent2) {
      let child1 = {
        id: makeid(4),
        width: parent1.width,
        height: parent2.length,
        length: parent1.length,
        content: parent1.content,
        x: Math.floor(Math.random() * map.width + 0),
        y: Math.floor(Math.random() * map.height + 0),
        dest: {
          x: 0,
          y: 0
        }
      }

      let child2 = {
        id: makeid(4),
        width: parent2.height,
        height: parent2.length,
        length: parent1.width,
        content: parent2.content,
        x: Math.floor(Math.random() * map.width + 0),
        y: Math.floor(Math.random() * map.height + 0),
        dest: {
          x: 0,
          y: 0
        }
      }

      return [child1, child2]
    }

    function fitness(parent) {

      let fitness = volume(parent.width, parent.height, parent.length) / 1000
      if (fitness > 1.5) {
        return fitness
      } else {
        return 0
      }
      //let fitness = 0
      // if(parent.width > 12 && parent.height > 13 && parent.length > 11) {
      //   fitness++
      //   return fitness
      // } else {
      //   return fitness
      // }

    }

    let geneticAI = new GAConstructor(config)

    let counter = 0
    let lastBestScore = 0
    let lastBestPackage = ''

    while (counter < 300) {
      geneticAI.evolve()
      if (geneticAI.bestScore() > lastBestScore && geneticAI.bestScore() > 4) {

        lastBestScore = geneticAI.bestScore()
        lastBestPackage = geneticAI.best()
        console.log("GENERACJA NR " + counter)
        console.log("Nowy najlepszy wynik " + lastBestScore)
        console.log("Dla paczki o ID " + lastBestPackage.id)
        console.log("Wymiary " + lastBestPackage.width + "/" + lastBestPackage.height + "/" + lastBestPackage.length)
        console.log("=======================================")

        if (map.grid[lastBestPackage.x][lastBestPackage.y].type == "floor" && !map.grid[lastBestPackage.x][lastBestPackage.y].isForklift) {
          map.grid[lastBestPackage.x][lastBestPackage.y].package = geneticAI.best();
          map.grid[lastBestPackage.x][lastBestPackage.y].isPackage = true;
          this.packages.push(map.grid[lastBestPackage.x][lastBestPackage.y].package);
        }
      }
      // console.log(geneticAI.best())
      // console.log(geneticAI.bestScore())
      // console.log('----------------------')
      // console.log(lastBestScore)
      // console.log('----------------------')
      counter++
    }
    return this.packages;
  }