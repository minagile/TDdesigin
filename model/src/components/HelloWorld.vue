<template>
  <div class="hello">
    <nav>
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">广告设计</a></li>
        <li><a href="#">背景元素</a></li>
        <li><a href="#">电商淘宝</a></li>
        <li><a href="#">多媒体</a></li>
        <li><a href="#">企业办公</a></li>
        <li><a href="#">装饰装修</a></li>
        <li><a href="#">插画配图</a></li>
      </ul>
      <div class="banner"></div>
    </nav>
    <div class="body">
      <div class="head">
        <p>排序方式：</p>
      </div>
      <div class="figure" v-for="(item, index) in data" :key="index">
        <a @click="$router.push({name: 'HomePage', query: {id: item.tId}})">
          <img :src="item.image" />
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
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      data: [],
      pageCount: 1,
      current: 1,
      showItem: 5,
      allpage: 13
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    link (id) {
      this.$router.push({name: 'HomePage', query: {id: id}})
      // window.open('#/homepage?id=' + id)
    },
    goto (index) {
      if (index === this.current) return
      this.current = index
      // 这里可以发送ajax请求
      this.getData()
    },
    getData () {
      let that = this
      that.$http.get('https://www.temaxd.com/temPage', {
        params: {
          pageCount: this.current
        }
      }).then(res => {
        // console.log(res.data.count)
        // console.log(res.data.data)
        res.data.data.forEach(v => {
          loadImage(v.image)
        })
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
  }
}
function loadImage (url) {
  var img = new Image()
  img.onload = function () {
    img.onload = null
  }
  img.src = url
}
</script>

<style lang="less" scoped>
.hello {
  width: 1200px;
  margin: 40px auto;
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
          color: #ff8a00;
          border-bottom: 2px solid #ff8a00;
        }
      }
    }
  }
  .banner {
    // width: 100%;
    height: 300px;
    background: #00ffdd60;
    margin: 20px;
    border-radius: 5px;
  }
}
.body {
  width: 100%;
  min-height: 100px;
  // background: #ff88006e;
  // margin-top: 30px;
  border-radius: 5px;
  overflow: hidden;
  padding-bottom: 80px;
  position: relative;
  .head {
    // width: 100%;
    height: 40px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background-color: #fafafa;
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
    width: 285px;
    height: 430px;
    border-radius: 10px;
    margin: 0 20px 30px 0;
    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
    overflow: hidden;
    position: relative;
    .cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      .cover_t {
        position: absolute;
        top: -100px;
        transition: 1s;
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
        transition: 1s;
        left: 0;
        width: 100%;
        height: 20%;
        background: linear-gradient(to top, rgba(0, 0, 0, .4) 0, transparent 100%);
        button {
          border-radius: 30px;
          background: linear-gradient(to right, #ffae12 0, #f07d17 100%);
          width: 70%;
          height: 60%;
          color: #fff;
          font-size: 24px;
          text-align: center;
          border-radius: 30px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
          cursor: pointer;
        }
      }
      &:hover {
        .cover_b {
          bottom: 0;
          transition: 1s;
        }
        .cover_t {
          top: 0;
          transition: 1s;
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
          color: #0E90D2;
          &:hover {
            background: #eee;
          }
        }
      }
    }
    .pagination li.active a {
      background: #0E90D2;
      color: #fff;
    }
  }
}
</style>
