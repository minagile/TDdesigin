<template>
  <div class="home-page">
    <nav>
      <div class="nav">
        <ul>
          <li><a href="/"><img src="../assets/logo.png" alt=""></a></li>
          <li><a href="/">首页</a></li>
          <li><a>设计分类</a></li>
        </ul>
      </div>
      <a class="down" v-show="btn" @click="downLoad" >免费下载</a>
      <div class="login">
        <HeadPage @loginShow="loginShow" :isLogin="isLogin"/>
      </div>
    </nav>
    <div class="body">
      <div class="local">当前位置:{{ data.laber }} > {{ data.title }}</div>
      <!-- <a href="#/">back to helloworld</a> -->
      <div class="title">
        {{ data.title }}
        <span>收藏：{{ data.collection }}</span>
        <span>下载：{{ data.download }}</span>
        <span>浏览：{{ data.browse }}</span>
      </div>
      <div class="pic-body">
        <div class="pic_box">
          <img id="img" :src="'https://spider-x.oss-cn-shanghai.aliyuncs.com/Template/' + data.image" alt="">
        </div>
        <div class="right">
          <div class="btn">
            <a @click="downLoad" >免费下载</a>
            <!-- <div class="img"></div> -->
          </div>
          <div class="msg">
            <p>
              <span>图片标签</span>
              <span>{{ data.laber }}</span>
            </p>
            <p>
              <span>颜色模式</span>
              <span>{{ data.pattern }}</span>
            </p>
            <p>
              <span>图片尺寸像素</span>
              <span>{{ data.pixel }}</span>
            </p>
            <p>
              <span>文件大小</span>
              <span>{{ data.size }}</span>
            </p>
            <p>
              <span>上传时间</span>
              <span>{{ data.date }}</span>
            </p>
          </div>
          <div class="search_babel">
            <span style="color:#666;font-size:12px;">
              声明：模板内容仅供参考，包图网是正版商业图库，所有原创作品（含预览图）均受著作权法保护。著作权及相关权利归本网站所有，未经许可任何人不得擅自使用，否则将依法要求承担高达人民币50万元的赔偿责任
            </span>
            <!-- <p>相关搜索：</p> -->
            <!-- <div class="search_related">
              <a>小满</a>
              <a>24节气海报</a>
              <a>小满节气</a>
              <a>节气</a>
              <a>24节气小满</a>
              <a>小满海报</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="user" id="id" v-if="isLoginShow" @click="close($event)">
      <Login @exit="exit" />
    </div>
    <div class="user" id="id2" v-if="isVIPShow" @click="close($event)">
      <VipCenter @closeClient="closeClient"/>
    </div>
  </div>
</template>

<script>
import Login from './Login'
import HeadPage from './HeadPage'
import VipCenter from './VipCenter'
export default {
  name: 'homepage',
  data () {
    return {
      data: {},
      isLoginShow: false,
      isLogin: false,
      avatar: '',
      Data: {},
      isVIPShow: false,
      btn: false
    }
  },
  mounted () {
    this.getData()
    this.getInfo()
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      let scroll = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scroll)
      if (scroll > 230) {
        this.btn = true
      } else {
        this.btn = false
      }
    },
    loginShow (data) {
      this.isLoginShow = data
    },
    closeClient (data) {
      this.isVIPShow = data
    },
    getInfo () {
      let that = this
      that.$http.get('https://www.temaxd.com/getUserInfo', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(res => {
        console.log(res.data)
        this.Data = res.data
        this.avatar = res.data.userAvatar
      })
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
      console.log(data)
      this.isLoginShow = data
      this.isLogin = true
      this.getInfo()
    },
    downLoad () {
      if (localStorage.getItem('userId')) {
        this.getInfo()
        if (this.Data.userLevel === '0') {
          this.isVIPShow = true
        } else {
          window.location.href = 'https://spider-x.oss-cn-shanghai.aliyuncs.com/Template/' + this.data.tId + '.psd'
          // 下载记录
          let that = this
          that.$http.post('http://www.temaxd.com/addDownload', {
            temId: this.$route.query.id
          }, { emulateJSON: true }).then(res => {
            console.log(res)
          })
        }
      } else {
        this.isLoginShow = true
      }
    },
    getData () {
      if (localStorage.getItem('userId')) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
      let that = this
      that.$http.get('https://www.temaxd.com/temInfo', {
        params: {
          temId: this.$route.query.id
        }
      }).then(res => {
        console.log(res.data)
        this.data = res.data
      })
      // 浏览记录接口调用，页面加载调用
      that.$http.get('http://www.temaxd.com/addBrowse', {
        temId: this.$route.query.id
      }, { emulateJSON: true }).then(res => {
        console.log(res.data)
      })
    }
  },
  components: {
    Login,
    HeadPage,
    VipCenter
  }
}
</script>

<style lang="less" scoped>
.home-page {
  position: relative;
}
.user {
  position: fixed;
  z-index: 999999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.419);
}
.login {
  position: absolute;
  top: 15px;
  // height: 60px;
  right: 10%;
}
nav {
  width: 100%;
  line-height: 80px;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 1001;
  -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .1);
  box-shadow: 0 0 8px rgba(0, 0, 0, .1);
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  line-height: 80px;
  .nav {
    width: 1200px;
    margin: 0 auto;
    ul {
      li {
        float: left;
        margin-left: 32px;
        img {
          width: 40px;
          display: block;
          margin-top: 20px;
          border-radius: 50%;
        }
        a {
          color: #666;
        }
        a:hover {
          color: #39BEAB;
        }
      }
    }
  }
  .down {
    display: inline-block;
    margin-right: -200px;
    border-radius: 30px;
    background: linear-gradient(to right, rgb(62, 201, 180) 0, rgb(53, 177, 158) 100%);
    width: 240px;
    height: 60px;
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 60px;
    -webkit-border-radius: 30px;
    border-radius: 30px;
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
    cursor: pointer;
  }
}
.body {
  width: 1200px;
  padding-top: 80px;
  text-align: left;
  margin: 0 auto 100px;
  .local {
    height: 14px;
    line-height: 14px;
    margin-top: 36px;
    font-size: 12px;
    color: #ccc;
    letter-spacing: 1px;
  }
  .title {
    width: 820px;
    padding-top: 29px;
    height: 40px;
    // float: left;
    color: #666;
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 1px;
    font-weight: 400;
    max-width: 80%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
      font-size: 12px;
      float: right;
    }
  }
  .pic-body {
    width: 100%;
    overflow: hidden;
    padding: 10px 0 100px 3px;
    .pic_box {
      position: relative;
      min-height: 800px;
      width: 700px;
      padding: 40px 60px;
      margin-right: 60px;
      -webkit-border-radius: 8px;
      border-radius: 8px;
      -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
      float: left;
      img {
        width: 100%;
      }
    }
    .right {
      float: left;
      width: 320px;
      padding-top: 39px;
      letter-spacing: 2px;
    }
  }
}
.right {
  .btn {
    padding-bottom: 40px;
    border-bottom: 1px solid #e6e6e6;
    overflow: hidden;
    a {
      float: left;
      // overflow: hidden;
      margin-right: 10px;
      border-radius: 30px;
      background: linear-gradient(to right, rgb(62, 201, 180) 0, rgb(53, 177, 158) 100%);
      width: 240px;
      height: 60px;
      color: #fff;
      font-size: 28px;
      text-align: center;
      line-height: 60px;
      -webkit-border-radius: 30px;
      border-radius: 30px;
      -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
      cursor: pointer;
    }
    .img {
      float: right;
      width: 60px;
      height: 60px;
      line-height: 58px;
      border: 1px solid #ccc;
      -webkit-border-radius: 50%;
      border-radius: 50%;
      text-align: center;
      text-indent: 2px;
      cursor: pointer;
      background-image: url(../assets/shoucang.png);
      background-size: cover;
      transition: 0.3s;
      &:hover {
        transition: 0.3s;
        border-color: #39BEAB;
        background-image: url(../assets/shoucang1.png);
        // img:hover {}
      }
    }
  }
  .msg {
    margin-top: 30px;
    padding-bottom: 27px;
    border-bottom: 1px solid #e6e6e6;
    p {
      width: 100%;
      height: 16px;
      font-weight: 500;
      line-height: 16px;
      margin-bottom: 30px;
      color: #666;
      overflow: hidden;
      span {
        float: left;
        &:last-of-type {
          float: right;
        }
      }
    }
  }
  .search_babel {
    padding: 30px 0;
    .search_related {
      overflow: hidden;
      a {
        float: left;
        display: block;
        padding: 4px 14px;
        margin: 15px 20px 0 0;
        font-size: 14px;
        font-weight: 500;
        color: #ccc;
        border: 1px solid #ccc;
        border-radius: 12px;
        cursor: pointer;
        transition: 1s;
        &:hover {
          transition: 1s;
          color: #39BEAB;
          border-color: #39BEAB;
        }
      }
    }
  }
}
</style>
