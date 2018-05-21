<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
  height: 100%;
}
* {
  text-decoration: none;
  outline: none;
  padding: 0;
  margin: 0;
  font-weight: 400;
}
a {
  cursor: pointer;
}
</style>
