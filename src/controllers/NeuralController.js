import brain from "brain.js";
import data from "@/assets/data";

const net = new brain.NeuralNetwork();

net.train(data.data);

export default {
  runNetwork: function (length, height, width) {
    let result = net.run([length, height, width]);
    if (result >= 0.5){
      console.log(result);
      return "big";
    }
    console.log(result);
    return "small";
  }
}