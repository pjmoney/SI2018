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
      <h1>delivered</h1>
      <ul>
        <li v-for="p in delivered" >
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
import PackageController from "@/controllers/PackageController";
export default {
  name: "app",
  components: {
    MainComponent
  },
  data() {
    return {
      packages: [],
      delivered: []
    };
  },
  mounted() {
  this.packages = PackageController.packages;
  this.delivered = PackageController.delivered;
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
