<template>
  <div class="flex-container" v-if="boards_are_ready">
    <Board
      v-for="board in displayBoards"
      :key="board.name"
      :board="board"
    ></Board>
    <CommandBar v-on:command_input_submit="passAnswer" />
  </div>
</template>

<script>
import Board from "@/components/Board.vue";
import CommandBar from "@/components/CommandBar.vue";

import { HabbiticaAdapter } from "@/adapters/adapter.js";
import { CommandParserService } from "@/services/commandParserService.js";
import { taskToTagsMapperService } from "@/services/taskToTagsMapperService.js";

const adapter = new HabbiticaAdapter({
  user: process.env.VUE_APP_USER_UID,
  key: process.env.VUE_APP_API_KEY
});

let displayBoards = [];

export default {
  name: "Home",
  data() {
    return {
      displayBoards: displayBoards,
      boards_are_ready: false
    };
  },
  components: {
    Board,
    CommandBar
  },
  created: function() {
    window.addEventListener("keyup", this.doCommand);
    this.refresh_data();
  },

  methods: {
    passAnswer: function(command) {
      let commandParser = new CommandParserService(
        command,
        adapter,
        this.displayBoards
      );
      commandParser.handleCommand();
      this.fetch_data();
    },

    fetch_data: function() {
      let that = this;
      Promise.all([adapter.getTasks(), adapter.getTags()]).then(function(
        values
      ) {
        let tasks = [];
        let tags = [];

        values.forEach(value => {
          if (value.config.url.includes("tasks")) {
            tasks = value.data.data;
          }
          if (value.config.url.includes("tags")) {
            tags = value.data.data;
          }
        });

        let tttms = new taskToTagsMapperService(tasks, tags);
        let boards = tttms.make_boards();

        for (const propertyname in boards) {
          displayBoards.push(boards[propertyname]);
        }

        that.displayBoards = boards;
        that.boards_are_ready = true;
      });
    },

    refresh_data: function() {
      this.fetch_data();
      setInterval(() => {
        this.fetch_data();
      }, 50000);
    },

    doCommand: function(e) {
      let keyPressed = String.fromCharCode(e.keyCode).toLowerCase();
      if (keyPressed == "b" && e.ctrlKey && e.altKey) {
        document.getElementById("command_input").focus();
      }
    }
  },
  destroyed() {
    window.removeEventListener("keyup", this.doCommand);
  }
};
</script>

<style scoped lang="scss">
.flex-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.flex-container .board {
  flex-basis: 22%;
  margin-bottom: 10px;
  margin-right: 2%;
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  box-sizing: border-box;
}
</style>
