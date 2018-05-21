<template>
  <div class="home-page">
    <nav>
      <div class="nav">
        <ul>
          <li><a href="/">首页</a></li>
          <li><a href="/">首页</a></li>
          <li><a href="/">首页</a></li>
          <li><a href="/">首页</a></li>
        </ul>
      </div>
    </nav>
    <div class="body">
      <div class="local">当前位置</div>
      <!-- <a href="#/">back to helloworld</a> -->
      <div class="title">
        当前位置当前位置当前位置
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
            <a :href="'https://spider-x.oss-cn-shanghai.aliyuncs.com/Template/' + data.tId + '.psd'" @click="downLoad" >免费下载</a>
            <div class="img"></div>
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
            <p>相关搜索：</p>
            <div class="search_related">
              <a>小满</a>
              <a>24节气海报</a>
              <a>小满节气</a>
              <a>节气</a>
              <a>24节气小满</a>
              <a>小满海报</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    downLoad () {
      // 下载记录
      let that = this
      that.$http.post('http://www.temaxd.com/addDownload', {
        temId: this.$route.query.id
      }, { emulateJSON: true }).then(res => {
        console.log(res)
      })
    },
    getData () {
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
  }
}
</script>

<style lang="less" scoped>
.home-page {
}
nav {
  width: 100%;
  height: 80px;
  position: fixed;
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
        a:hover {
          color: #ff8a00;
        }
      }
    }
  }
}
.body {
  width: 1200px;
  padding-top: 80px;
  text-align: left;
  margin: 0 auto;
  .local {
    height: 14px;
    line-height: 14px;
    margin-top: 36px;
    font-size: 12px;
    color: #ccc;
    letter-spacing: 1px;
  }
  .title {
    width: 780px;
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
  }
  .pic-body {
    width: 100%;
    // overflow: hidden;
    .pic_box {
      position: relative;
      min-height: 100px;
      width: 700px;
      padding: 40px 60px 0;
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
      background: linear-gradient(to right, #ffae12 0, #f07d17 100%);
      width: 240px;
      height: 60px;
      color: #fff;
      font-size: 28px;
      text-align: center;
      line-height: 56px;
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
        border-color: #ff8a00;
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
          color: #ff8a00;
          border-color: #ff8a00;
        }
      }
    }
  }
}
</style>
