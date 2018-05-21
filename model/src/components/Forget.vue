<template>
  <div class="forget-page">
    <div class="login forget">
      <h4>找回密码</h4>
      <p class="right_now">已有账号，<router-link to="/login">马上登录</router-link></p>
      <input type="text" placeholder="手机号/邮箱" v-model="number" />
      <input type="password" placeholder="请新输入密码" v-model="password" />
      <input type="password" placeholder="确认密码" v-model="confirmpassword" />
      <div class="code">
        <input type="text" placeholder="输入验证码" v-model="code" />
        <a @click="sendCode($event)">发送验证码<span v-show="timeOut">{{ num }}</span></a>
      </div>
      <button @click="next">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgetPage',
  data () {
    return {
      number: '',
      password: '',
      code: '',
      confirmCode: '',
      confirmpassword: '',
      num: 60,
      timeOut: false
    }
  },
  mounted () {
  },
  methods: {
    // 倒计时
    countDown (count, e) {
      e.className = 'forbidden'
      // console.log(e.style)
      this.num = count + 's'
      let iTimer = setInterval(() => {
        count--
        this.num = count + 's'
        if (count <= 0) {
          clearInterval(iTimer)
          this.timeOut = false
          // e.style.background = 'red'
        }
      }, 1000)
    },
    sendCode (ev) {
      if (this.number === '') {
        alert('账号不能为空')
      } else if (this.password === '') {
        alert('密码不能为空')
      } else if (this.password.length < 6 || this.password.length > 12) {
        alert('请输入6位以上12位以下密码')
      } else if (this.number.indexOf('@') === -1) {
        if ((/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.number))) {
          if (this.timeOut === false) {
            this.$http.post('https://www.temaxd.com/sendPhone', {
              phone: this.number
            }, { emulateJSON: true }).then(response => {
              console.log(response.data.RAND)
              this.timeOut = true
              this.countDown(60, ev.path[0])
              this.confirmCode = response.data.RAND
            }, response => {
              console.log('error')
            })
          }
        } else {
          alert('手机号有误')
        }
      } else {
        if ((/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.number))) {
          if (this.timeOut === false) {
            this.$http.post('https://www.temaxd.com/sendEmail', {
              email: this.number
            }, { emulateJSON: true }).then(response => {
              console.log(response.data[1].RAND)
              this.timeOut = true
              this.countDown(60, ev.path[0])
              this.confirmCode = response.data[1].RAND
            }, response => {
              console.log('error')
            })
          }
        } else {
          alert('邮箱输入有误')
        }
      }
    },
    next () {
      if (this.number === '') {
        alert('empty')
      } else if (this.password === '') {
        alert('密码不为空')
      } else if (this.password.length < 6 || this.password.length > 12) {
        alert('请输入6位以上12位以下密码')
      } else if (this.code === '') {
        alert('验证码不为空')
      } else {
        if (this.password === this.confirmpassword) {
          if (this.code === this.confirmCode) {
            this.$http.post('https://www.temaxd.com/forgetUser', {
              account: this.number,
              pwd: this.password
            }, { emulateJSON: true }).then(response => {
              console.log(response.data)
              if (response.data.code === '200') {
                alert(response.data.message)
                this.$router.push('/login')
              } else {
                alert(response.data.message)
              }
            }, response => {
              console.log('error')
            })
          } else {
            alert('验证码错误')
          }
        } else {
          alert('两次输入不一致')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.forget-page {
  background: #3cc8b4;
  position: fixed;
  width: 100%;
  height: 100%;
  // padding: 100px;
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
.forget {
  h4 {
    font-size: 18px;
    color: #42a5f5;
    text-align: center;
    width: 400px;
    margin: 0 auto;
  }
  .right_now {
    width: 380px;
    text-align: right;
    margin: 20px auto 30px;
    font-size: 12px;
    color: #cacaca;
    a {
      color: #42a5f5;
    }
  }
  .code {
    position: relative;
    width: 340px;
    margin: 0 auto;
    a {
      position: absolute;
      font-size: 12px;
      color: #969696;
      line-height: 33px;
      right: 0;
      top: 0;
      &:hover {
        color: #3895e8;
      }
      &.forbidden:hover {
        color: #969696;
      }
    }
  }
}
</style>
