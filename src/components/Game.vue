<template>
  <div class="game">
    <canvas
      id="canvas"
      ref="game"
      v-bind:width="canvas.w"
      v-bind:height="canvas.h"
      style="border: 2px dotted black"
      tabindex="0"
      @keypress="Time($event)"
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
      index: -1,
      timer: null,
    };
  },

  created() {
    this.socket = io("/");
  },

  mounted() {
    // this.$nextTick(() => {
    this.context = this.$refs.game.getContext("2d");
    this.socket.on("sockets", (list) => {
      this.clients = list;
      this.context.clearRect(0, 0, 600, 600);
      for (let i = 0; i < list.length; i++) {
        if (this.socket.id != this.clients[i].id) {
          this.context.fillStyle = this.random_rgba();
          this.context.fillRect(list[i].x, list[i].y, list[i].w, list[i].h);
        } else {
          this.context.fillStyle = "blue";
          this.context.fillRect(list[i].x, list[i].y, list[i].w, list[i].h);
        }
      }
    });
    // });
  },

  methods: {
    yarat() {},

    hareket(event) {
      for (var i = 0; i < this.clients.length; i++) {
        if (this.socket.id == this.clients[i].id) {
          this.index = i;
        }
      }
      if (event.key == "W" || event.key == "w") {
        this.clients[this.index].y -= 1;
      }

      if (event.key == "S" || event.key == "s") {
        this.clients[this.index].y += 1;
      }

      if (event.key == "A" || event.key == "a") {
        this.clients[this.index].x -= 1;
      }

      if (event.key == "D" || event.key == "d") {
        this.clients[this.index].x += 1;
      }

      var data = [
        this.clients[this.index].x,
        this.clients[this.index].y,
        this.clients[this.index].id,
        this.index,
      ];
      this.socket.emit("position", data);
    },
    random_rgba() {
      var o = Math.round,
        r = Math.random,
        s = 255;
      return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
    },

    Time(event) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.hareket(event);
      }, 25);
    },
  },
};
</script>

<style scoped>
</style>
