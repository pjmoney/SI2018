<template>
  <div id="app">
    <MainComponent style="float:left;"/>
    <div id="info" style="float:left; margin-left: 20px; font-size:18px;">
      <h1>Packages</h1>
      <ul>
        <li v-for="p in packages" >
          <b>Number:</b>{{p.id}} 
          <b>X:</b>{{p.x}},<b>Y:</b>{{p.y}} 
          <b>width:</b>{{p.width}},<b>height:</b>{{p.height}},<b>length:</b>{{p.length}}
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
import MainComponent from "./components/MainComponent.vue";
import MapController from "@/controllers/MapController";
export default {
  name: "app",
  components: {
    MainComponent
  },
  data() {
    return {
      packages: []
    };
  },
  mounted() {
  this.packages = MapController.packages;
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
