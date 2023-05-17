<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  export default{
    created(){
      this.$store.commit('INITUSER')
    }
  }
</script>

<style>

</style>
