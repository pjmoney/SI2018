<template>

<div id="map" v-bind:style="mapStyle" @click.ctrl="turn" @click.exact="move">
  <div v-for="g in grid" id="cell">
    <Cell :type="g"/>
  </div>
</div>

</template>

<script src="@/controllers/MainController">
</script>

<style scoped>
#map{
  
}
#cell{
  display: inline-block;
  box-sizing: border-box;  
  border: 1px solid #000;
  height: 32px;
  width: 32px;
}
#map #cell:not(:first-child){
  margin-top:-4px;
}
</style>
