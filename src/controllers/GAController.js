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

