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
      clients: [],
      canvas: { h: 600, w: 600 },
      index: -1,
    };
  },

  created() {
    this.socket = io("/");
  },

  mounted() {
    this.$nextTick(() => {
      this.context = this.$refs.game.getContext("2d");
      this.socket.on("sockets", (list) => {
        this.clients = list;
        this.context.clearRect(0, 0, 600, 600);
        for (let i = 0; i < list.length; i++) {
          this.context.fillStyle = list[i].c;
          this.context.fillRect(list[i].x, list[i].y, list[i].w, list[i].h);
        }
        // console.log(list);
        this.socket.emit("sockets", this.clients);
      });
    });
  },

  methods: {
    hareket(event) {
      for (var i = 0; i < this.clients.length; i++) {
        if (this.socket.id == this.clients[i].id) {
          this.index = i;
        }
      }
      if (event.key == "up" || event.key == "W" || event.key == "w") {
        this.clients[this.index].y -= 5;
      }

      if (event.key == "down" || event.key == "S" || event.key == "s") {
        this.clients[this.index].y += 5;
      }

      if (event.key == "left" || event.key == "A" || event.key == "a") {
        this.clients[this.index].x -= 5;
      }

      if (event.key == "right" || event.key == "D" || event.key == "d") {
        this.clients[this.index].x += 5;
      }

      var data = [
        this.clients[this.index].x,
        this.clients[this.index].y,
        this.clients[this.index].id,
      ];
      this.socket.emit("position", data);

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
    },
  },
};
</script>

<style scoped>
</style>
