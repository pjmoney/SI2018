import MapController from "@/controllers/MapController";
import Floor from "@/components/Floor";
import Forklift from "@/components/Forklift";
import BigStore from "@/components/BigStore";
import SmallStore from "@/components/SmallStore";
// import neutral from "@/controllers/NeuralController";

export default {
  name: "MainComponent",
  components: {
    "floor": Floor,
    "forklift": Forklift,
    "bigstore": BigStore,
    "smallstore": SmallStore
  },
  data() {
    return {
      mapStyle: MapController.mapStyle,
      grid: []
    }
  },
  methods: {
  },
  mounted() {
    this.grid = MapController.init();
  }
};
