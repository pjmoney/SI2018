import map from "@/models/MapModel"
import MapController from "@/controllers/MapController";
import ForkliftController from "@/controllers/ForkliftController";
import PackageController from "@/controllers/PackageController"
import Forklift from "@/models/ForkliftModel";
import Cell from "@/components/Cell";
import AstarController from "@/controllers/AstarController";
// import neutral from "@/controllers/NeuralController";

export default {
  name: "MainComponent",
  components: {
    Cell
  },
  data() {
    return {
      mapStyle: MapController.mapStyle,
      grid: map.gridPub,
      forklift: Forklift
    };
  },
  methods: {
    move: function() {
      ForkliftController.start()
    },
    turn: function() {
      ForkliftController.turn(-1)
    }
  },
  beforeCreate() {
    MapController.init();
  }
};
