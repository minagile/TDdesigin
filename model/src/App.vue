<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* min-height: 1000px; */
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
input, button {
  outline: none;
}
a {
  cursor: pointer;
  text-decoration: none;
  outline: none;
}
</style>
