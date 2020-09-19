<template>
  <div class="board" :tabindex="board.index">
    <h1>[{{ board.index }}] {{ board.name }}</h1>
    <TaskList :key="board.name + 'task_list'" :tasks="board.tasks"></TaskList>
  </div>
</template>

<script>
"use strict";
import TaskList from "../components/TaskList.vue";

export default {
  name: "Board",
  components: {
    TaskList
  },
  props: {
    board: Object
  }
};
</script>
