<template>
  <div v-bind:style="style"></div>
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
}
</script>

<style>
</style>