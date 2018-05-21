<template>
  <div class="side-bar">
    <a class="single_item" href="https://www.temaxd.com/TemaxdServer/index.html#/"></a>
    <!-- <a class="single_item" href="http://localhost:8081/#/"></a> -->
    <router-link class="single_item" to="/mypros"></router-link>
    <router-link class="single_item" to="/"></router-link>
    <router-link class="single_item" to="/">
      <img v-show="avatar ? true : false" :src="avatar" alt="">
      <img v-show="avatar ? false : true" src="../assets/head.png" alt="">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
    }
  },
  props: {
    avatar: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.side-bar {
  width: 70px;
  // background: rgba(131, 223, 240, 0.404);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: 100px;
  .single_item {
    width: 30px;
    height: 30px;
    display: block;
    // background: #3cc8b4;
    background-size: cover;
    margin:0 auto 30px;
    cursor: pointer;
    &:nth-of-type(1) {
      transition: 1s;
      background-image: url('../assets/add1.png');
      &:hover {
        transition: 1s;
        background-image: url('../assets/add.png');
      }
    }
    &:nth-of-type(2) {
      background-image: url('../assets/file1.png');
      transition: 1s;
      &:hover {
        transition: 1s;
        background-image: url('../assets/file.png');
      }
    }
    &:nth-of-type(3) {
      background-image: url('../assets/nav_file_n.png');
      transition: 1s;
      &:hover {
        transition: 1s;
        background-image: url('../assets/nav_file_n1.png');
      }
    }
    img {
      width: 100%;
      min-height: 100%;
      border-radius: 50%;
    }
  }
}
</style>
