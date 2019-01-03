<template>
  <div v-bind:style="style">
    <img v-if="type.type == 'forklift'" src="../assets/forklift.png" />
    <img v-if="type.type == 'package'" src="../assets/package.png" />
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      style: {
        background: "#ccc",
        height: "100%",
        width: "100%"
      }
    }
  },
  created() {
    if(this.type.type == "smallstore") this.style.background = "#a7c3f2"
    if(this.type.type == "bigstore") this.style.background = "#efd9a5"
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