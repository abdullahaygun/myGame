<template>
  <div class="game">
    <canvas
      id="canvas"
      ref="game"
      v-bind:width="canvas.w"
      v-bind:height="canvas.h"
      style="border: 2px dotted black"
      tabindex="0"
      @keypress="hareket($event)"
    ></canvas>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "Game",
  data() {
    return {
      socket: {},
      context: {},
      canvas: { h: 600, w: 600 },
      oyuncular: [],
      timer: null,
      index: -1,
      data: [],
    };
  },

  created() {
    this.socket = io("/");
  },

  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.socket.on("AllPlayer", (data) => {
      this.oyuncular = data;
    });
    // setInterval(() => {
    this.context.clearRect(0, 0, 600, 600);
    for (let i = 0; i < this.oyuncular.length; i++) {
      if (this.oyuncular[i].id == this.socket.id) {
        this.context.fillStyle = "blue";
      } else {
        this.context.fillStyle = this.oyuncular[i].c;
      }
      this.context.fillRect(
        this.oyuncular[i].x,
        this.oyuncular[i].y,
        this.oyuncular[i].gen,
        this.oyuncular[i].gen
      );
    }
    // }, 30);
  },

  methods: {
    hareket(event) {
      let data = { id: this.socket.id, key: event.key };
      this.socket.emit("pos", data);
    },
  },
};
</script>

<style scoped>
</style>
