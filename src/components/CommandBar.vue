<template>
  <div class="command_bar">
    <input id="command_input" v-model="command" type="text" value=":$ " v-on:keyup.enter="submit"/>
  </div>
</template>

<script>
'use strict'

export default {
  name: 'CommandBar',
  methods:{
    submit: function(){
      this.$emit('command_input_submit', this.command);
      this.command = '';
    }
  },
  data: function(){
      return {
        command: ''
      }
    }
}
</script>

<style scoped lang="scss">
.command_bar{
  position: fixed;
  bottom: 0;
  width: 100%;
  background: black;
}

.command_bar > input{
  width: 100%;
  font-size: 36px;
  background: black;
  color: greenyellow;
}

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

