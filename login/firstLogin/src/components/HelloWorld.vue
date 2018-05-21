<template>
  <div class="hello">
    <sidebar :avatar="avatar"></sidebar>
    <div class="message">
      <h2>我的资料</h2>
      <div class="view-body">
        <div class="top-bar">
          <div class="top">
            <a>个人资料</a>
          </div>
        </div>
        <div class="info">
          <div class="head-portrait">
            <img v-if="avatar ? true: false" :src="avatar" />
            <img v-if="avatar ? false: true" src="../assets/head.png" />
            <div class="head-info">
              <div class="change-head">
                <img src="../assets/per.png" alt="">
                <a>修改头像
                  <input type="file"
                  name="avatar"
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                  @change="file($event)" />
                </a>
              </div>
              <p>＊仅支持JPG、PNG格式的图片，文件小于5M</p>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">姓名</div>
              <div class="col-input" v-show="!hasName">
                <span v-if="userName ? false: true">未命名</span>
                <span v-if="userName ? true: false">{{ userName }}</span>
                <img src="../assets/write.png" @click="hasName = true" />
              </div>
              <div class="col-input user-name" v-show="hasName">
                <input type="text" v-model="nickName">
                <a class="myName" @click="saveName">保存</a>
                <a class="myName l" @click="hasName = false">取消</a>
              </div>
            </div>
            <div class="row">
              <div class="col">职位</div>
              <div class="col-input" v-show="!hasPosition">
                <div class="tian" style="overflow:hidden;">
                  <span v-if="userPosition ? false: true">暂未填写职位信息</span>
                  <span v-if="userPosition ? true: false">{{ userPosition }}</span>
                  <img src="../assets/write.png" @click="hasPosition = true" />
                </div>
              </div>
              <div class="col-input user-name" v-show="hasPosition">
                <input type="text" v-model="position" placeholder="请填写职位信息" />
                <a class="myName" @click="savePosition">保存</a>
                <a class="myName l" @click="hasPosition = false">取消</a>
              </div>
            </div>
            <div class="row">
              <div class="col">手机号码</div>
              <div class="col-input" v-show="!hasPhone">
                <span>{{ userPhone }}</span>
                <img src="../assets/write.png" @click="hasPhone = true" />
              </div>
              <div class="col-input" v-show="hasPhone">
                <div class="send_code">
                  <input type="text" v-model="userPhone">
                  <a @click="sendCodeChange">获取验证码</a>
                </div>
                <div class="user-name">
                  <input type="text" v-model="phoneCode" placeholder="输入你手机收到的验证码" />
                  <a class="myName" @click="savePhone">保存</a>
                  <a class="myName l" @click="hasPhone = false">取消</a>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">电子邮箱</div>
              <div class="col-input" v-show="!hasEmail">
                <span></span>{{ userEmail }}
                <img src="../assets/write.png" @click="hasEmail = true" />
              </div>
              <div class="col-input user-name email" v-show="hasEmail">
                <input type="text" v-model="userEmail" placeholder="请输入你的邮箱地址">
                <a class="myName" @click="saveEmail">发送验证邮件</a>
                <a class="myName l" @click="hasEmail = false">取消</a>
              </div>
            </div>
            <div class="row">
              <div class="col">QQ</div>
              <div class="col-input">
                <div class="wei">
                  <span>未绑定</span>{{ userQQ }}
                  <a>绑定QQ</a>
                </div>
                <p>＊绑定微信后，你可以使用微信登录特赞、及时接收留言与通知</p>
              </div>
            </div>
            <div class="row">
              <div class="col">微信</div>
              <div class="col-input">
                <div class="wei">
                  <span>未绑定</span>{{ userWeiXin }}
                  <a>绑定微信</a>
                </div>
                <p>＊绑定微信后，你可以使用微信登录特赞、及时接收留言与通知</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './SideBar'
export default {
  name: 'HelloWorld',
  data () {
    return {
      userEmail: '',
      userName: '',
      userPhone: '',
      userPosition: '',
      userQQ: '',
      userWeiXin: '',
      avatar: '',
      hasName: false,
      nickName: '',
      hasPosition: false,
      position: '',
      hasPhone: false,
      phoneCode: '',
      confirmCode: '',
      hasEmail: false
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    // 获取用户基本信息
    getInfo () {
      let that = this
      that.$http.get('http://www.temaxd.com/getUserInfo', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(res => {
        console.log(res.data)
        this.avatar = res.data.userAvatar
        this.userEmail = res.data.userEmail
        this.userName = res.data.userName
        this.nickName = res.data.userName
        this.userPhone = res.data.userPhone
        this.userPosition = res.data.userPosition
        this.userQQ = res.data.userQQ
        this.userWeiXin = res.data.userWeiXin
      })
    },
    // 上传头像
    file (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.onload = function (e) {
        that.avatar = this.result
      }
      reader.readAsDataURL(file)
      var image = new FormData()
      image.append('file', file)
      let config = { headers: { 'Content-Type': 'multipart/form-data' } }
      this.$http.post('http://www.temaxd.com/uploadHeadIMG?fileName=' + file.type.split('/')[1] + '&userId=' + localStorage.getItem('userId') + '&oldFileName=' + this.userAvatar, image, config).then(function (response) {
        console.log(response.data)
        this.avatar = response.data.image
      })
    },
    // 修改昵称
    saveName () {
      let that = this
      that.$http.post('http://www.temaxd.com/bindUserName', {
        userName: this.nickName,
        userId: localStorage.getItem('userId')
      }, {emulateJSON: true}).then(res => {
        console.log(res.data)
        if (res.data.code === '200') {
          this.hasName = false
          this.getInfo()
        }
      })
    },
    // 修改职位信息
    savePosition () {
      let that = this
      that.$http.post('http://www.temaxd.com/bindUserPosition', {
        userPosition: this.position,
        userId: localStorage.getItem('userId')
      }, {emulateJSON: true}).then(res => {
        console.log(res.data)
        if (res.data.code === '200') {
          this.hasPosition = false
          this.getInfo()
        }
      })
    },
    // 修改电话号码
    sendCodeChange () {
      this.$http.post('http://www.temaxd.com/sendPhone', {
        phone: this.userPhone
      }, { emulateJSON: true }).then(response => {
        console.log(response.data.RAND)
        this.confirmCode = response.data.RAND
      }, response => {
        console.log('error')
      })
    },
    savePhone () {
      if (this.phoneCode === '') {
        alert('请输入验证码')
      } else if (this.confirmCode === this.phoneCode) {
        let that = this
        that.$http.post('http://www.temaxd.com/bindUserPhone', {
          userPhone: this.userPhone,
          userId: localStorage.getItem('userId')
        }, {emulateJSON: true}).then(res => {
          console.log(res.data)
          if (res.data.code === '200') {
            this.hasPhone = false
          }
        })
      }
    },
    // 修改邮箱
    saveEmail () {}
  },
  components: {
    Sidebar
  }
}
</script>

<style lang="less" scoped>
.hello {
  background: #f8f8f8;
  height: 100%;
}
.message {
  width: 750px;
  margin: 0 auto;
  padding: 30px 50px;
  h2 {
    height: 36px;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: normal;
    color: #333;
  }
  .view-body {
    width: 100%;
    .top-bar {
      height: 46px;
      width: 100%;
      margin-bottom: 10px;
      background: #fff;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
      .top {
        width: 250px;
        text-align: center;
        line-height: 46px;
        a {
          padding: 11px 4px;
          color: #3cc8b4;
          font-size: 16px;
          border-bottom: 2px solid #3cc8b4;
        }
      }
    }
    .info {
      width: 100%;
      min-height: 500px;
      background: #fff;
    }
  }
}
.head-portrait {
  height: 80px;
  padding: 30px 60px;
  border-bottom: 1px solid #eaeaea;
  overflow: hidden;
  img {
    display: block;
    float: left;
    width: 80px;
    height: 80px;
    margin-right: 40px;
    border-radius: 50%;
  }
  .head-info {
    float: left;
    .change-head {
      height: 20px;
      margin:17px 0 10px 0;
      img {
        width: 20px;
        height: 20px;
        margin: 0 10px 0 0;
      }
      a {
        color: #3cc8b4;
        font-size: 14px;
        font-weight: 300;
        transition: .3s;
        position: relative;
        cursor: pointer;
        &:hover {
          color: #32ac99;
          transition: .3s;
        }
        button {
          cursor: pointer;
        }
        input {
          position: absolute;
          top: 0;
          left: -50px;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
    p {
      font-size: 12px;
      color: #999;
      font-weight: 300;
    }
  }
}
.card-body {
  padding: 30px 80px;
  .row {
    width: 100%;
    min-height: 21px;
    line-height: 21px;
    margin-bottom: 30px;
    font-size: 14px;
    font-weight: 300;
    color: #aaa;
    overflow: hidden;
    .col {
      box-sizing: border-box;
      padding: 0 15px;
      width: 33.33%;
      float: left;
      height: 21px;
      font-weight: 300;
    }
    .col-input {
      box-sizing: border-box;
      padding: 0 15px;
      width: 66.67%;
      min-height: 21px;
      float: left;
      font-weight: 300;
      overflow: hidden;
      .send_code {
        margin-bottom: 15px;
        width: 100%;
        border: 1px solid #eaeaea;
        height: 36px;
        box-sizing: border-box;
        padding: 7px 1em;
        letter-spacing: 1px;
        color: #666;
        line-height: 20px;
        border-radius: 2px;
        border: 1px solid #eaeaea;
        outline: none;
        position: relative;
        input {
          float: left;
          width: 241px;
          color: #666;
          font-weight: 300;
          font-size: 14px;
          border: 0;
          border-right: 1px solid #eaeaea;
          height: 20px;
          line-height: 20px;
        }
        a {
          display: block;
          position: absolute;
          bottom: 1px;
          top: 1px;
          right: 1px;
          padding: 10px 15px;
          line-height: 1em;
          margin: 0;
        }
      }
      .wei {
        overflow: hidden;
      }
      span {
        float: left;
        color: #333;
        font-weight: 300;
        margin-right: 10px;
        font-size: 14px;
        line-height: 21px;
      }
      a {
        float: left;
        color: #3cc8b4;
        font-weight: 300;
        margin-right: 10px;
        font-size: 14px;
        cursor: pointer;
        line-height: 21px;
      }
      img {
        width: 14px;
        height: 14px;
        margin-top: 3px;
        display: block;
        float: left;
        cursor: pointer;
      }
      p {
        font-size: 12px;
        color: #aaa;
        margin-top: 8px;
        font-weight: 300;
      }
    }
  }
  .row .user-name {
    &.email {
      input {
        width: 200px;
      }
    }
    input {
      float: left;
      display: block;
      width: 280px;
      box-sizing: border-box;
      padding: 7px 1em;
      letter-spacing: 1px;
      color: #666;
      line-height: 20px;
      border-radius: 2px;
      border: 1px solid #eaeaea;
      outline: none;
    }
    ::-webkit-input-placeholder {
      font-size: 14px;
      color: #cacaca;
      font-weight: 300;
    }
    ::-moz-placeholder {
      font-size: 14px;
      color: #cacaca;
      font-weight: 300;
    }
    :-ms-input-placeholder {
      font-size: 14px;
      color: #cacaca;
      font-weight: 300;
    }
    input:-moz-placeholder {
      font-size: 14px;
      color: #cacaca;
      font-weight: 300;
    }
    .myName {
      margin: 0;
      font-size: 14px;
      margin-left: 13px;
      line-height: 36px;
    }
    .l {
      color: #999;
    }
  }
}
</style>
