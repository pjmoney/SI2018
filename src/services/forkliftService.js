import Forklift from '../models/forklift.js';

const position = {
  x: 15,
  y: 11
}

export default class ForkliftService {
  constructor(){
    this.fork = new Forklift(null, position)
  }
}