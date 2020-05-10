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

export default {
  name: "TaskList",
  props: {
    tasks: Array
  }
};
</script>

<style scoped lang="scss">
a {
  color: #42b983;
}

ol > li {
  text-align: left;
}

.approve_button{
  color: greenyellow;
}

.delete_button{
  color: red;
}
</style>
