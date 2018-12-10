import MapController from "@/controllers/MapController";
import neutral from "@/controllers/NeutralController"

export default {
  name: "MainComponent",

  data(){
    return{
      mapStyle: MapController.mapStyle,
      cellStyle: MapController.cellStyle
    }
  },
  methods:{
    generate: function (){
    }
  },
  mounted(){
    let l = Math.floor(Math.random() * 20) + 1
      let w = Math.floor(Math.random() * 20) + 1
      let h = Math.floor(Math.random() * 20) + 1
      let result = {
        length: l,
        height: h,
        width: w,
        destination: neutral.runNetwork(l,h,w)
      }
      console.log(result)
  }
};