<template>
  <div class="board" :tabindex="index">
    <h1>[{{board.index+1}}] {{board.slug}}</h1>
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

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

