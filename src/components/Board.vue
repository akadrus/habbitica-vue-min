<template>
  <div class="board" :tabindex="index">
    <h1>[{{board.index}}] {{board.slug}}</h1>
    <TaskList
      :key="board.slug+'task_list'"
      :tasks="board.tasks"
    ></TaskList>
  </div>
</template>

<script>
'use strict'
import TaskList from '../components/TaskList.vue'

export default {
  name: 'Board',
  components: {
    TaskList,
  },
  props: {
    board: Object,
    index: Number
  },
}
</script>
