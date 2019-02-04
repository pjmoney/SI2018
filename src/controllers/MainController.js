import map from "@/models/MapModel"
import MapController from "@/controllers/MapController";
import ForkliftController from "@/controllers/ForkliftController";
import Forklift from "@/models/ForkliftModel";
import Cell from "@/components/Cell";
import PackageController from "./PackageController";

export default {
  name: "MainComponent",
  components: {
    Cell
  },
  data() {
    return {
      mapStyle: MapController.mapStyle,
      grid: map.gridPub,
      forklift: Forklift,
      genetic: '',
    };
  },
  methods: {
    move: function() {
        this.grid = ForkliftController.start()
     
    },
    turn: function() {
      ForkliftController.turn(-1);
    }
  },
  mounted() {
  
  },
  created() {
    //MapController.packages = PackageController.packages
    
  },
  beforeCreate() {
    MapController.init();
    //MapController.packages = PackageController.packages
  }
};
