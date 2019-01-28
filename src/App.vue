<template>
  <div id="app">
    <div class="info" style="float:left; margin-left: 2%; font-size:18px; margin-top: -100px;">
      <h1>Packages</h1>
      <table class="tg" style="undefined;table-layout: fixed; width: 564px">
        <colgroup>
        <col style="width: 73px">
        <col style="width: 49px">
        <col style="width: 48px">
        <col style="width: 64px">
        <col style="width: 60px">
        <col style="width: 63px">
        </colgroup>
          <tr>
            <th class="tg-1wig">ID</th>
            <th class="tg-1wig">X</th>
            <th class="tg-1wig">Y</th>
            <th class="tg-1wig">WIDTH</th>
            <th class="tg-1wig">HEIGHT</th>
            <th class="tg-1wig">LENGTH</th>
          </tr>
          <tr v-for="p in packages">
            <td class="tg-0lax">{{p.id}}</td>
            <td class="tg-0lax">{{p.x}}</td>
            <td class="tg-0lax">{{p.y}}</td>
            <td class="tg-0lax">{{p.width}}</td>
            <td class="tg-0lax">{{p.height}}</td>
            <td class="tg-0lax">{{p.length}}</td>
          </tr>
        </table></div>
        <div class="info" style="float:right; margin-right: 2%;font-size:18px; margin-top: -100px;">
      <h1>Delivered</h1>
      <table class="tg" style="undefined;table-layout: fixed; width: 564px">
        <colgroup>
        <col style="width: 73px">
        <col style="width: 49px">
        <col style="width: 48px">
        <col style="width: 64px">
        <col style="width: 60px">
        <col style="width: 63px">
        </colgroup>
          <tr>
            <th class="tg-1wig">ID</th>
            <th class="tg-1wig">X</th>
            <th class="tg-1wig">Y</th>
            <th class="tg-1wig">WIDTH</th>
            <th class="tg-1wig">HEIGHT</th>
            <th class="tg-1wig">LENGTH</th>
          </tr>
          <tr v-for="p in delivered">
            <td class="tg-0lax">{{p.id}}</td>
            <td class="tg-0lax">{{p.x}}</td>
            <td class="tg-0lax">{{p.y}}</td>
            <td class="tg-0lax">{{p.width}}</td>
            <td class="tg-0lax">{{p.height}}</td>
            <td class="tg-0lax">{{p.length}}</td>
          </tr>
        </table>
    </div>

    <MainComponent style="margin-top: 200px;margin: 0 auto;"/>
    
        
    
  <footer style="color:#7c7c7c;bottom:20px; bottom: 0;vertical-align: bottom; margin: 0 auto;">Made by Piotr Umreyan, Łukasz Tatrocki, Kacper Tomczak<br>&copy 2019</footer>
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
.tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;}
.tg .tg-1wig{font-weight:bold;text-align:left;vertical-align:top}
.tg .tg-buh4{background-color:#f9f9f9;text-align:left;vertical-align:top}
.tg .tg-0lax{text-align:left;vertical-align:top}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 200px;
}
</style>
