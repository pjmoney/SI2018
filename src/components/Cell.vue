<template>
  <div :style="style">
    <img v-if="type.isForklift" :style="{ transform: transform }" src="../assets/forklift.png" />
    <img v-if="type.isPackage" src="../assets/package.png" />
  </div>
</template>

<script>
import Forklift from "@/models/ForkliftModel"
export default {
  props: ["type"],
  data() {
    return {
      style: {
        background: "#f7f7f7",
        height: "100%",
        width: "100%",
      },
      transform: "",
      forklift: Forklift
    }
  },
  watch: {
    forklift: {
      handler: function() {
        this.direction()
      },
      deep: true
    }
  },
  created() {
    if(this.type.type == "smallstore") this.style.background = "#db4343"
    if(this.type.type == "bigstore") this.style.background = "#f9b731"
    if(this.type.type == "floor" && this.type.cost == 3) this.style.background = "#c9c9c9"
    if(this.type.type == "floor" && this.type.cost == 2) this.style.background = "#e5e5e5"
    this.direction()
  },
  methods:{
    direction(){
      switch(this.forklift.direction){
        case "S":
          this.transform = "rotate(90deg)"
          break
        case "N":
          this.transform = "rotate(-90deg)"
          break
        case "E":
          this.transform = "rotate(0deg)"
          break
        case "W":
          this.transform = "scaleX(-1)"
          break
      }
    }
  }
}
</script>

<style>
img {
     max-width: 24px;
    height: 24px;
    display: block;
    margin: 0 auto;
}
</style>
