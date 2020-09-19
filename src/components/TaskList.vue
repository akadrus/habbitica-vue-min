<template>
  <div>
    <ol>
      <li v-for="item in tasks" :key="item.id"> 
        {{ item.text }}
      </li>
    </ol>
  </div>
</template>

<script>
'use strict'

export default {
  name: "TaskList",
  props: {
    tasks: Array
  }
};
</script>

<style scoped lang="scss">
ol > li {
  text-align: left;
}
</style>
