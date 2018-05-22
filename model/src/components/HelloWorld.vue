<template>
  <div class="hello">
    <nav>
      <img class="logo" src="../assets/logo1.png" alt="">
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">海报设计</a></li>
        <li><a href="#">电商淘宝</a></li>
        <li><a href="#">企业办公</a></li>
        <!-- <li><a v-show="isLogin">个人中心</a></li> -->
        <li><a @click="VIP">VIP</a></li>
      </ul>
      <div class="head">
        <HeadPage @loginShow="loginShow" :isLogin="isLogin" />
      </div>
      <div class="banner"></div>
    </nav>
    <div class="body">
      <div class="head">
        <!-- <p>排序方式：</p> -->
      </div>
      <div class="figure" v-for="(item, index) in data" :key="index">
        <a @click="$router.push({name: 'HomePage', query: {id: item.tId}})">
          <img :src="item.image" />
          <!-- <img v-lazy="item.image" /> -->
          <!-- <img src="https://spider-x.oss-cn-shanghai.aliyuncs.com/Template/aaa.JPEG" alt=""> -->
        </a>
        <a class="cover" @click="link(item.tId)">
          <div class="cover_t">
            <span>{{ item.title }}</span>
          </div>
          <div class="cover_b">
            <button>免费下载</button>
          </div>
        </a>
      </div>
      <div class="page">
        <ul class="pagination" >
          <li v-show="current !== 1" @click="current-- && goto(current)" >
            <a href="#">上一页</a>
          </li>
          <li v-for="index in pages" @click="goto(index)" :class="{'active':current === index}" :key="index">
            <a href="#" >{{ index }}</a>
          </li>
          <li v-show="allpage !== current && allpage !== 0 " @click="current++ && goto(current++)">
            <a href="#" >下一页</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="user" id="id" v-if="isLoginShow" @click="close($event)">
      <Login @exit="exit"/>
    </div>
    <div class="user" id="id2" v-if="isVIPShow" @click="close($event)">
      <Demo @closeClient="closeClient"/>
    </div>
  </div>
</template>

<script>
import Login from './Login'
import Demo from './VipCenter'
import HeadPage from './HeadPage'
export default {
  name: 'HelloWorld',
  data () {
    return {
      data: [],
      pageCount: 1,
      current: 1,
      showItem: 5,
      allpage: 13,
      isLoginShow: false,
      isLogin: false,
      isVIPShow: false,
      avatar: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
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
        // this.data = res.data
        this.avatar = res.data.userAvatar
      })
    },
    VIP () {
      if (localStorage.getItem('userId')) {
        this.isVIPShow = true
      } else {
        this.isLoginShow = true
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
    link (id) {
      this.$router.push({name: 'HomePage', query: {id: id}})
      // window.open('#/homepage?id=' + id)
    },
    goto (index) {
      if (index === this.current) return
      this.current = index
      // 这里可以发送ajax请求
      this.data = []
      this.getData()
    },
    getData () {
      if (localStorage.getItem('userId')) {
        this.isLogin = true
        this.getInfo()
      } else {
        this.isLogin = false
      }
      let that = this
      that.$http.get('https://www.temaxd.com/temPage', {
        params: {
          pageCount: this.current
        }
      }).then(res => {
        this.data = res.data.data
      })
    }
  },
  computed: {
    pages: function () {
      var pag = []
      if (this.current < this.showItem) {
        // 如果当前的激活的项 小于要显示的条数
        // 总页数和要显示的条数那个大就显示多少条
        var i = Math.min(this.showItem, this.allpage)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        // 当前页数大于显示页数了
        let middle = this.current - Math.floor(this.showItem / 2)
        // 从哪里开始
        let i = this.showItem
        if (middle > (this.allpage - this.showItem)) {
          middle = (this.allpage - this.showItem) + 1
        }
        while (i--) {
          pag.push(middle++)
        }
      }
      return pag
    }
  },
  components: {
    Login,
    Demo,
    HeadPage
  }
}
</script>

<style lang="less" scoped>
.hello {
  width: 1600px;
  margin: 140px auto;
  position: relative;
}
.user {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.419);
}
.login {
  width: 100%;
  text-align: right;
  padding-bottom: 20px;
  overflow: hidden;
  .img {
    width: 100px;
    float: right;
    text-align: right;
  }
  img {
    width: 40px;
    height: 40px;
    display: inline-block;
    border-radius: 50%;
    // float: right;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid #ccc;    
    &:hover {
      border: 1px solid #ccc;
    }
  }
  .sign_out {
    display: none;
    width: 100px;
    height: 30px;
    border: 1px solid #ccc;
    background-color: #fff;
    position: absolute;
    right: -20px;
    top: 40px;
    margin-top: 10px;
    text-align: center;
    line-height: 30px;
    z-index: 100;
    a {
      background: #fff;
      display: block;
      line-height: 30px;      
      cursor: pointer;
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
nav {
  position: relative;
  padding-top: 28px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: 0 4px 20px rgba(0, 0, 0, .2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, .2);
  min-height: 50px;
  padding-bottom: 20px;
  .logo {
    width: 180px;
    position: absolute;
    top: -100px;
    left: 45%;
  }
  .head {
    position: absolute;
    // height: 80px;
    top: -58px;
    right: 0;
  }
  ul {
    // overflow: hidden;
    width: 100%;
    height: 24px;
    line-height: 24px;
    padding: 0 90px 0 40px;
    li {
      float: left;
      padding: 0 29px;
      a {
        display: block;
        height: 24px;
        line-height: 16px;
        color: #666;
        cursor: pointer;
        &:hover {
          color: #39BEAB;
          border-bottom: 2px solid #39BEAB;
        }
      }
    }
  }
  .banner {
    // width: 100%;
    height: 382px;
    // background: #00ffdd60;
    margin: 20px 40px;
    border-radius: 5px;
    background-image: url(https://pic.ibaotu.com/banner/20180521/5b0228508f513.jpg!fqc1390);
    background-size: cover;
    background-position: center center;
  }
}
.body {
  width: 100%;
  // padding: 0 10px;
  min-height: 100px;
  // background: #ff88006e;
  // margin-top: 30px;
  border-radius: 5px;
  overflow: hidden;
  padding-bottom: 80px;
  position: relative;
  .head {
    // width: 100%;
    // height: 40px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 40px;
    padding-left: 60px;
    margin: 40px auto 25px;
    font-size: 14px;
    p {
      color: #666;
      float: left;
    }
  }
  .figure {
    float: left;
    width: 340px;
    height: 480px;
    border-radius: 10px;
    margin: 0 30px 50px 30px;
    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
    overflow: hidden;
    position: relative;
    box-shadow: 1px 15px 20px rgba(0, 0, 0, 0.2);
    &:hover {
    }
    .cover {
      // display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      .cover_t {
        position: absolute;
        top: -100px;
        transition: 0.3s;
        left: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, .4) 0, transparent 100%);
        span {
          display: block;
          color: #fff;
          padding-top: 20px;
        }
      }
      .cover_b {
        position: absolute;
        bottom: -100px;
        transition: 0.3s;
        left: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(to top, rgba(0, 0, 0, .4) 0, transparent 100%);
        button {
          border-radius: 30px;
          background: linear-gradient(to right, rgb(65, 209, 187) 0, rgb(51, 170, 152) 100%);
          width: 70%;
          height: 60%;
          color: #fff;
          font-size: 24px;
          text-align: center;
          border-radius: 30px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
          cursor: pointer;
          border: 0;
        }
      }
      &:hover {
        .cover_b {
          bottom: 0;
          transition: 0.3s;
        }
        .cover_t {
          top: 0;
          transition: 0.3s;
        }
      }
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    &:nth-of-type(4n + 1) {
      margin-right: 0;
    }
  }
  .page {
    position: absolute;
    bottom: 0;
    width: 100%;
    // left: 0;
    .pagination {
      position: relative;
      // height: 80px;
      padding-top: 10px;
      li {
        display: inline-block;
        margin: 0 5px;
        a {
          padding: .5rem 1rem;
          display: inline-block;
          border: 1px solid #ddd;
          background: #fff;
          color: #39BEAB;
          &:hover {
            background: #eee;
          }
        }
      }
    }
    .pagination li.active a {
      background: #39BEAB;
      color: #fff;
    }
  }
}
</style>
