<template>
  <div class="flex-container" v-if="boards_are_ready">
      <Board 
        v-for="board in displayBoards"
        :index="board.index"
        :key="board.slug"
        :board="board"
      ></Board>
      <CommandBar v-on:command_input_submit="passAnswer" />
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import CommandBar from '@/components/CommandBar.vue'

import { HabbiticaAdapter } from '@/adapters/adapter.js'
import { CommandParserService } from '@/services/commandParserService.js'
import { taskToTagsMapperService } from '@/services/taskToTagsMapperService.js'

const adapter = new HabbiticaAdapter(
  {
    user: '2bd43415-87da-4b86-bc27-855835e80215',
    key: process.env.VUE_APP_API_KEY
  },
)



let displayBoards = []

export default {
  name: 'Home',
  data() {
    return {
      displayBoards: displayBoards,
      boards_are_ready: false,
    }
  },
  components: {
    Board,
    CommandBar,
  },
  created: function() {
  	window.addEventListener('keyup', this.doCommand);
    this.refresh_data();
  },

  methods: {
    passAnswer: function(command){

    let commandParser = new CommandParserService(command, adapter, this.displayBoards); 
    commandParser.handleCommand();
    this.fetch_data();
    },


    fetch_data: function() {
      let that = this
      Promise.all([adapter.getTasks(), adapter.getTags()]).then(function(
        values,
      ) {
        let tasks = []
        let tags = []
        // #FIXME @FIXME maybe we can get it from API?
        values.forEach(value => {
          if (value.config.url.includes('tasks')) {
            tasks = value.data.data
          }
          if (value.config.url.includes('tags')) {
            tags = value.data.data
          }
        })

        let tttms = new taskToTagsMapperService(tasks, tags)
        let boards = tttms.make_boards()

        for (const propertyname in boards) {
          displayBoards.push(boards[propertyname])
        }

        that.displayBoards = boards
        that.boards_are_ready = true
      })
    },

    refresh_data: function() {
      this.fetch_data();
      //  @FIXME kinda risky
      setInterval(() => {
        this.fetch_data();
      }, 10000)
    },

    doCommand: function(e) { 
      let keyPressed = String.fromCharCode(e.keyCode).toLowerCase();
       if(keyPressed == "b" && e.ctrlKey && e.altKey){
        document.getElementById('command_input').focus();
       }
    }
  },
destroyed() {
	window.removeEventListener('keyup', this.doCommand);
},

}
</script>

<style scoped lang="scss">
.flex-container{
  display: flex;
}
.flex-container .board{
  flex-grow: 1;
}
</style>