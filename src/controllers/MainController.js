import MapController from "@/controllers/MapController";
import ForkliftController from "@/controllers/ForkliftController";
import Cell from "@/components/Cell";
// import neutral from "@/controllers/NeuralController";

export default {
  name: "MainComponent",
  components: {
    Cell
  },
  data() {
    return {
      mapStyle: MapController.mapStyle,
      grid: [],
    };
  },
  methods: {
    move: function() {
      this.grid = MapController.setMap(ForkliftController.move())
    },
    turn: function() {
      this.grid = MapController.setMap(ForkliftController.turn(-1))
    }
  },
  mounted() {
    this.grid = MapController.init();
  }
};
