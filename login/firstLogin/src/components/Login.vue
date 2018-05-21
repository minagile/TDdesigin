<template>
  <div class="login-page">
    <div class="login">
      <input type="text" placeholder="手机号/用户名/UID/邮箱" v-model="user" />
      <input type="password" placeholder="请输入密码" v-model="password" />
      <div class="forget">
        <router-link to="register" class="l">账号注册</router-link>
        <router-link to="forget" class="r">忘记密码</router-link>
      </div>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      user: '',
      password: ''
    }
  },
  mounted () {
  },
  methods: {
    login () {
      if (this.user === '') {
        alert('账号不能为空')
      } else if (this.password === '') {
        alert('请输入密码')
      } else if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.user) || /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.user)) {
        this.$http.post('http://www.temaxd.com/doLogin', {
          account: this.user,
          pwd: this.password
        }, { emulateJSON: true }).then(response => {
          console.log(response.data)
          // this.data = response.data.userId
          if (response.data.code === '200') {
            // alert('登录成功')
            localStorage.setItem('userId', response.data.userId)
            window.location.href = 'file://Users/sushanshan/Desktop/Temaxd/index.html'
          } else {
            alert(response.data.message)
          }
        }, response => {
          console.log('error')
        })
      } else {
        alert('gehsi')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  background: #3cc8b4;
  position: fixed;
  width: 100%;
  height: 100%;
}
.login {
  width: 460px;
  // height: 228px;
  background: #fff;
  padding: 65px 0 30px 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -240px 0 0 -230px;
  border-radius: 10px;
  input {
    font-size: 20px;
    width: 340px;
    height: 33px;
    display: block;
    margin: 0 auto 16px;
    border: 0;
    border-bottom: 1px solid #cacaca;
  }
  ::-webkit-input-placeholder {
    font-size: 14px;
    color: #cacaca;
    font-weight: 200;
  }
  ::-moz-placeholder {
    font-size: 14px;
    color: #cacaca;
    font-weight: 200;
  }
  :-ms-input-placeholder {
    font-size: 14px;
    color: #cacaca;
    font-weight: 200;
  }
  input:-moz-placeholder {
    font-size: 14px;
    color: #cacaca;
    font-weight: 200;
  }
  .forget {
    width: 340px;
    margin: 0 auto;
    overflow: hidden;
    a {
      font-size: 12px;
      color: #8d8d8d;
      cursor: pointer;
      &:hover {
        color: #3895e8;
      }
    }
    .r {
      float: right;
    }
    .l {
      float: left;
    }
  }
  button {
    width: 340px;
    font-size: 18px;
    font-weight: 400;
    color: white;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 20px auto;
    display: block;
    border-radius: 5px;
    cursor: pointer;
    background-color: #42a5f5;
    border: 0;
  }
}
</style>
