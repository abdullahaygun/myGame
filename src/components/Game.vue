<template>
  <div class="game">
    <canvas
      id="canvas"
      ref="game"
      v-bind:width="canvas.w"
      v-bind:height="canvas.h"
      style="border: 2px dotted black"
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
      clients: [],
      canvas: { h: 600, w: 600 },
    };
  },

  created() {
    // this.socket = io("http://localhost:3000");
    this.socket = io("/");
  },

  mounted() {
    this.socket.on("deneme", (test) => {
      console.log(test);
    });
    this.$nextTick(() => {
      this.context = this.$refs.game.getContext("2d");
      this.socket.on("sockets", (list) => {
        this.clients = list;
        this.context.clearRect(0, 0, 600, 600);
        for (let i = 0; i < this.clients.length; i++) {
          this.context.fillStyle = this.clients[i].c;
          this.context.fillRect(
            this.clients[i].x,
            this.clients[i].y,
            this.clients[i].w,
            this.clients[i].h
          );
        }
        console.log(this.clients);
      });
    });
  },
};
</script>

<style scoped>
</style>
