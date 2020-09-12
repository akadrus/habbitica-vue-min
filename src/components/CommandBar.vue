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

</style>

