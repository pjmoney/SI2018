<template>
  <div id="app">
    <div v-show="dialog || loader" style="margin-top: -100px;">
      <h3 class="display-2 font-weight-light">v.0.8</h3>
      <br>
      <h1 class="display-4 font-weight-black" >AI Forklift</h1>
    </div>
    <v-dialog
      persistent
      v-model="dialog"
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">Algorytm genetyczny?</v-card-title>

        <v-card-text>
           Czy chcesz wygenerować duże paczki, korzystając z algorytmu genetycznego?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="loader = true, genetic = false"
          >
            Nie
          </v-btn>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="loader = true, genetic = true"
          >
            Tak
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="loader"
      hide-overlay
      persistent
      width="700"
    >
      <v-card
        color="#fff"
      >
        <v-card-text>
          Please wait ... 
          <v-progress-linear
            indeterminate
            color="#db4343"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div v-if="!dialog && !loader">
    <div class="info" style="float:left; margin-left: 2%; font-size:18px; margin-top: -100px;">
      <h2 class="display-3 font-weight-light">Packages</h2>
      <!-- <table class="tg" style="undefined;table-layout: fixed; width: 564px">
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
        </table>-->
        <v-data-table
    :headers="this.headers1"
    :items="this.packages"
     hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.id }}</td>
      <td class="text-xs-right">{{ props.item.x }}</td>
      <td class="text-xs-right">{{ props.item.y }}</td>
      <td class="text-xs-right">{{ props.item.width }}</td>
      <td class="text-xs-right">{{ props.item.height }}</td>
      <td class="text-xs-right">{{ props.item.length }}</td>
    </template>
  </v-data-table>
        </div> 
        <div class="info" style="float:right; margin-right: 2%;font-size:18px; margin-top: -100px;">
      <h2 class="display-3 font-weight-light">Delivered</h2>
      <!-- <table class="tg" style="undefined;table-layout: fixed; width: 564px">
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
        </table> -->
        <v-data-table style="max-width=200px"
    :headers="this.headers2"
    :items="this.delivered"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.id }}</td>
      <td class="text-xs-right">{{ props.item.x }}</td>
      <td class="text-xs-right">{{ props.item.y }}</td>
      <td class="text-xs-right">{{ props.item.width }}</td>
      <td class="text-xs-right">{{ props.item.height }}</td>
      <td class="text-xs-right">{{ props.item.length }}</td>
      <td class="text-xs-right" :class="['big', isSmall(props.item) ? 'small': '']">{{ props.item.size }}</td>
    </template>
  </v-data-table>
    </div>

    <MainComponent style="margin-top: 200px;margin: 0 auto;"/>
    <div style="margin-top:30px">
        <v-btn flat @click="refresh()" color="red">Refresh</v-btn>
      </div>
  </div>
  <footer style="color:#707070; position: absolute; text-align:left; padding: 20px;line-height:24px;bottom:20px; bottom: 0;vertical-align: bottom; margin: 0 auto; margin-top:100px;">Made by Piotr Umreyan, Łukasz Tatrocki, Kacper Tomczak<br>&copy 2019</footer>
  </div>
  
</template>

<script>
import MainComponent from "./components/MainComponent.vue";
import PackageController from "@/controllers/PackageController";
import MainController from "@/controllers/MainController"
export default {
  name: "app",
  components: {
    MainComponent
  },
  data() {
    return {
      packages: [],
      delivered: [],
      dialog: true,
      loader: false,
      genetic: '',
      headers1: [
        {text: "ID", sortable: false, value:"id"},
        {text: "X", sortable: false, value: "x"},
        {text: "Y", sortable: false, value: "y"},
        {text:"WIDTH", sortable: false, value: "width"},
        {text: "HEIGHT", sortable: false, value: "height"},
        {text: "LENGTH", sortable: false, value: "length"},
    ],headers2: [
        {text: "ID", sortable: false, value:"id"},
        {text: "X", sortable: false, value: "x"},
        {text: "Y", sortable: false, value: "y"},
        {text:"WIDTH", sortable: false, value: "width"},
        {text: "HEIGHT", sortable: false, value: "height"},
        {text: "LENGTH", sortable: false, value: "length"},
        {text: "SIZE", sortable: true, value: "size"},
    ]
  }},
  methods:{
    refresh: function() {
      location.reload()
    },
    isSmall: function(obj) {
      console.log("isSmall ODPALAM")
      if(obj.size == "SMALL") return true
      return false
    }
  },
  watch: {
      genetic(val) {
        MainController.genetic = this.genetic
      },
      loader (val) {
        this.dialog = false
        if (!val) return

        setTimeout(() => (this.loader = false ), 1200)
      }
    },
  mounted() {
  this.packages = PackageController.packages;
  this.delivered = PackageController.delivered;
  }
};
</script>

<style>
.big {color: red}
.small {color: green}
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
