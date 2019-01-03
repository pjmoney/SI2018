import MapController from "@/controllers/MapController";
import Cell from "@/components/Cell"
// import neutral from "@/controllers/NeuralController";

export default {
  name: "MainComponent",
  components: {
    Cell
  },
  data() {
    return {
      mapStyle: MapController.mapStyle,
      grid: []
    };
  },
  mounted() {
    MapController.init()
    this.grid = MapController.grid();
  }
};
