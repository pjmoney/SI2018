import map from "@/models/MapModel"

export default {
  mapStyle: {
    height: map.width*map.tileWidth + "px",
    width: map.height*map.tileHeight + "px"
  },
  cellStyle: {
    background: "#ccc"
  }
}