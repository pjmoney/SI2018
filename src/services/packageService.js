import Package from '../models/package.js';

export default class PackageService {
    constructor(){

    }

    randomPackage(count, map){
        let packages = [];

        while(count > 0){
            let x = Math.floor(Math.random() * map.width);
            let y = Math.floor(Math.random() * (map.height * 11/16));

            let position = {
                x: x,
                y: y
            };
    
            let weight = Math.floor(Math.random() * 30) + 1;
            let length = Math.floor(Math.random() * 20) + 1;
            let width = Math.floor(Math.random() * 20) + 1;
            let height = Math.floor(Math.random() * 20) + 1;
    
            packages.push(new Package(weight, width, height, length, position));
            count--;
        }

        return packages;
    }

    randomPackageOnce(packages, map){
        let x = Math.floor(Math.random() * map.width);
        let y = Math.floor(Math.random() * (map.height - 1) * 0.75);

        let position = {
            x: x,
            y: y
        };

        let weight = Math.floor(Math.random() * 30) + 1;
        let length = Math.floor(Math.random() * 20) + 1;
        let width = Math.floor(Math.random() * 20) + 1;
        let height = Math.floor(Math.random() * 20) + 1;

        packages.push(new Package(weight, width, height, length, position));

        return packages;
    }

    givePackage(packages,target){
        var i = 0;

        packages.forEach(function (pck){
            i++;
            if(pck.position.x == target.x && pck.position.y == target.y){
                packages.splice(i,1);
                return packages;
            }
        })
    }
}