<template>
  <div class="HeadPage">
    <div class="login l" v-show="!isLogin">
      <a class="lo" @click="$emit('loginShow', true)">请登录</a>
      <a @click="$emit('loginShow', true)">免费注册</a>
    </div>
    <div class="login" v-show="isLogin">
      <!-- tuyt -->
      <div class="img" @mouseenter="show" @mouseleave="hide">
        <img v-if="avatar ? true : false" :src="avatar" alt="">
        <img v-if="avatar ? false : true" src="../assets/shoucang.png" alt="">
        <div class="sign_out" id="out" >
          <div class="user_name">
            <b>{{ data.userName }}</b>
            <span v-if="data.userLevel === '0' ? false : true"><img src="../assets/vip.png" alt=""></span>
            <span v-if="data.userLevel === '0' ? true : false"><img src="../assets/normalvip.png" alt=""></span>
          </div>
          <a href="https://www.temaxd.com/TemaxdServer/index.html#/hello" target="_blank">个人中心</a>
          <a @click="out">退出登录</a>
        </div>
      </div>
    </div>
    <!-- <div class="user" id="id" v-if="isLoginShow" @click="close($event)">
      <Login @exit="exit"/>
    </div> -->
  </div>
</template>

<script>
import Demo from './VipCenter'
import Login from './Login'
export default {
  name: 'headpage',
  data () {
    return {
      isLoginShow: false,
      // isLogin: false,
      isVIPShow: false,
      avatar: '',
      data: ''
    }
  },
  mounted () {
    // console.log(this.isLogin)
    this.getInfo()
  },
  watch: {
    isLogin () {
      this.getInfo()
      console.log(1)
    }
  },
  methods: {
    out () {
      localStorage.clear()
      this.getInfo()
    },
    hide (e) {
      document.getElementById('out').style.display = 'none'
    },
    show () {
      document.getElementById('out').style.display = 'block'
    },
    getInfo () {
      if (localStorage.getItem('userId')) {
        this.isLogin = true
        let that = this
        that.$http.get('https://www.temaxd.com/getUserInfo', {
          params: {
            userId: localStorage.getItem('userId')
          }
        }).then(res => {
          // console.log(res.data)
          this.data = res.data
          this.avatar = res.data.userAvatar
        })
      } else {
        this.isLogin = false
      }
    },
    close (e) {
      if (e.target === document.getElementById('id')) {
        this.isLoginShow = false
      }
      if (e.target === document.getElementById('id2')) {
        this.isVIPShow = false
      }
    },
    exit (data) {
      // console.log(data)
      this.getInfo()
      this.isLoginShow = data
      this.isLogin = true
    },
  },
  props: {
    isLogin: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  components: {
    Login,
    Demo
  }
}
</script>

<style lang="less" scoped>
.user {
  position: fixed;
  width: 2000px;
  height: 1000px;
  // height: 100%;
  // width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.419);
  z-index: 9999999;
}
.HeadPage {
  width: 200px;
  .l {
    line-height: 60px;
  }
  .login {
    width: 100%;
    position: relative;
    .img {
      position: absolute;
      right: 0;
      height: 60px;
      background-size: cover;
      cursor: pointer;
      text-align: right;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .sign_out {
        display: none;
        padding: 20px;
        width: 160px;
        line-height: 30px;
        border: 1px solid #ccc;
        background-color: #fff;
        position: relative;
        right: -10px;
        top: 0px;
        text-align: left;
        line-height: 30px;
        z-index: 100;
        .user_name {
          width: 100%;
          height: 30px;
          padding-bottom: 10px;
          b {
            float: left;
          }
          span {
            float: right;
            display: block;
            width: 20px;
            height: 20px;
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
        a {
          background: #fff;
          display: block;
          line-height: 30px;      
          cursor: pointer;
        }
      }
    }
    a {
      color: #666;
      padding: 0 10px;
      height: 26px;
      line-height: 26px;
      &:hover {
        color: #39BEAB;
      }
    }
    .lo {
      display: inline-block;
      text-align: center;
      width: 62px;
      padding: 0;
      height: 26px;
      line-height: 26px;
      text-indent: 3px;
      color: #39BEAB;
      border: 1px solid #39BEAB;
      -webkit-border-radius: 12px;
      border-radius: 12px;
      &:hover {
        background: #39BEAB;
        color: #fff;
      }
    }
  }
}
</style>
