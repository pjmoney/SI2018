<template>
  <div v-bind:style="style">
    <img src="https://github.com/outfizzy/SI2018/blob/new-environment/img/forklift.png?raw=true"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      style: {
        background: "#ccc",
        height: "100%",
        width: "100%"
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