<template>
  <div id="searchHome">
    <div class="header">
      <div class="logo-box">
        <div class="logo-bg" @click="refresh">
          <img class="logo" src="../assets/logo.png">
        </div>
      </div>
      <div class="search">
        <div class="searchbox">
          <img  @click="searchbtn" src="https://spider-x.oss-cn-shanghai.aliyuncs.com/temaxd/search_1.png">
          <input type="text" v-model="keyword" @keyup="search(keyword, $event)"/>
        </div>
      </div>
      <div class="menu" @click="clickMenu">
        <div class="menu-bg">
          <img src="https://spider-x.oss-cn-shanghai.aliyuncs.com/temaxd/menu.png" alt="">
        </div>
        <div class="menu-list" v-show="isMenuShow">
          <span class="arrow"></span>
          <div class="menu-detail"><a>扁诞搜索</a></div>
          <div class="menu-detail"><a href="http://adm.meihua.info/" target="_blank">营销数据</a></div>
          <div class="menu-detail"><a href="https://event.tezign.com/home" target="_blank">营销日历</a></div>
          <div class="menu-detail"><a href="https://account.teambition.com/login" target="_blank">扁诞协作</a></div>
          <div class="menu-detail"><a href="http://www.uisdc.com/archives" target="_blank">行业咨询</a></div>
        </div>
      </div>
    </div>
    <div class="no-data" v-if="noData">没有“{{keyword}}”相关联的数据</div>
    <div class="page-body" id="list">
      <div class="popup" v-for="(item, index) in list" :key="index"  ref="elementList">
        <router-link v-html="item.msg" :to="{path:'/searchDetail',query:{url: item.url, laber: item.laber}}" target="_blank"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
const WIDTH = 260
export default {
  name: 'SearchHome',
  data () {
    return {
      list: [],
      msg: '',
      data: [],
      images: [],
      oList: '',
      column: 7,
      keyword: '',
      isMenuShow: false,
      noData: false
    }
  },
  mounted () {
    this.clientChange()
    window.addEventListener('resize', this.clientWidthChange)
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    refresh () {
      history.go(0)
    },
    // 菜单按钮
    clickMenu () {
      if (this.isMenuShow === false) {
        this.isMenuShow = true
      } else {
        this.isMenuShow = false
      }
    },
    // 搜索功能
    search (keyword, e) {
      this.keyword = keyword
      if (e.keyCode === 13) {
        // window.location.href = 'http://www.temaxd.com/searchShow.html?searchName=' + keyword
        let that = this
        that.$http({
          method: 'GET',
          url: 'https://www.temaxd.com/LireEngine/searchFlowCard',
          params: {
            searchName: keyword
          }
        }).then(function (response) {
          // console.log(response.data)
          if (response.data === '没有查到') {
            // alert('没有数据')
            this.noData = true
            this.images = []
            this.list = []
            this.getData()
          } else {
            this.noData = false
            this.data = response.data
            this.images = []
            this.list = []
            this.createList()
          }
        })
      }
    },
    searchbtn () {
      let that = this
      that.$http({
        method: 'GET',
        url: 'https://www.temaxd.com/LireEngine/searchFlowCard',
        params: {
          searchName: this.keyword
        }
      }).then(function (response) {
        // console.log(response.data)
        if (response.data === '没有查到') {
          // alert('没有数据')
          this.noData = true
          this.images = []
          this.list = []
          this.getData()
        } else {
          this.noData = false
          this.data = response.data
          this.images = []
          this.list = []
          this.createList()
        }
      })
    },
    // 检测窗口宽度
    clientChange () {
      let columnWidth = document.documentElement.clientWidth
      this.oList = document.getElementById('list')
      // console.log(Math.floor(columnWidth / WIDTH))
      let row = Math.floor(columnWidth / WIDTH)
      if (row > 7) {
        this.column = 7
      } else if (row <= 1) {
        this.column = 1
      } else {
        this.column = row
      }
      this.oList.style.width = WIDTH * this.column + 'px'
      // this.getData()
      this.$http.get('https://www.temaxd.com/cardFlow').then(response => {
        // console.log(response.data)
        this.data = response.data
        this.createList()
        this.getData()
      })
    },
    clientWidthChange () {
      let columnWidth = document.documentElement.clientWidth
      this.oList = document.getElementById('list')
      // console.log(Math.floor(columnWidth / WIDTH))
      let row = Math.floor(columnWidth / WIDTH)
      if (row > 7) {
        this.column = 7
      } else if (row <= 1) {
        this.column = 1
      } else {
        this.column = row
      }
      this.oList.style.width = WIDTH * this.column + 'px'
      this._calculateHeight()
    },
    // 监听滚动事件
    handleScroll () {
      let scroll = document.documentElement.scrollTop || document.body.scrollTop
      let scrollH = document.documentElement.scrollHeight || document.body.scrollHeight
      let clientH = document.documentElement.clientHeight || document.body.clientHeight
      if (clientH + scroll === scrollH) {
        // console.log('滚动到底部')
        // console.log(this.keyword)
        if (this.keyword === '') {
          this.getData()
        } else {
          let that = this
          that.$http({
            method: 'GET',
            url: 'https://www.temaxd.com/LireEngine/searchFlowCard',
            params: {
              searchName: this.keyword
            }
          }).then(function (response) {
            this.data = response.data
            this.createList()
          })
        }
      }
    },
    // 获取数据
    getData () {
      this.$http.get('https://www.temaxd.com/cardFlow').then(response => {
        // console.log(response.data)
        this.data = response.data
        this.createList()
      })
    },
    // 创建dom元素
    createList () {
      this.data.forEach((v, k) => {
        // 预加载
        loadImage(v.ossImage).then(img => {
          this.images.push(img)
          this.msg = `<div class="img"><img src="${img.src}" alt=""></div>
          <div class="cover"></div>
            <div class="word">${v.title}</div>`
          this.list.push({'msg': this.msg, 'url': img.src.split('?')[0].split('/').pop(), 'laber': v.laber.split(',')[0]})
          this.$nextTick(() => {
            this._calculateHeight()
          })
        }).catch(err => console.log(err))
      })
      // 预加载图片
      function loadImage (url) {
        return new Promise((resolve, reject) => {
          let img = new Image()
          img.onload = () => resolve(img)
          img.onerror = reject
          img.src = url
        })
      }
    },
    // 计算每个元素的高度，并给上定位属性
    _calculateHeight () {
      let foodList = this.$refs.elementList
      let arr = []
      foodList.forEach((v, k) => {
        if (k < this.column) {
          // 前6个
          v.style.top = 0
          v.style.left = k * WIDTH + 'px'
          arr.push(v.offsetHeight)
          // console.log(arr)
        } else {
          let iMinH = Math.min(...arr)
          let iMinIndex = arr.indexOf(iMinH)
          v.style.left = iMinIndex * WIDTH + 'px'
          v.style.top = iMinH + 20 + 'px'
          arr[iMinIndex] = iMinH + v.offsetHeight + 20
        }
      })
    }
  }
}
</script>

<style lang="less">
* {text-decoration: none;}
.header {
  text-align: center;
  height: 66px;
  line-height: 85px;
  border-bottom: 1px solid #e2e1e1;
  padding-top: 17px;
  position: relative;
  .logo-box {
    width: 109px;
    height: 50px;
    position: absolute;
    top: 17px;
    left: 0;
    cursor: pointer;
    .logo-bg {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding: 12.5px;
      margin-right: 11%;
      margin-left: 11%;
      margin-top: -7.5px;
      float: right;
      .logo {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .logo-bg:hover {
      background: rgba(0,0,0,0.08);
    }
  }
  .search {
    width: 100%;
    padding: 5px 109px 0 109px;
    height: 45px;
    box-sizing: border-box;
    .searchbox {
      height: 40px;
      background: rgba(0,0,0,0.08);
      border-radius: 7px;
      width: 100%;
      box-sizing: border-box;
      position: relative;
    }
    img {
      // float: left;
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      margin: 7.5px 10px;
      margin-left: 25px;
      cursor: pointer;
    }
    input {
      height: 40px;
      font-size: 16px;
      color: #666;
      float: left;
      border: 0;
      box-sizing: border-box;
      background: rgba(255,255,255,0);
      width: 100%;
      padding-left: 70px;
    }
  }
  .menu {
    position: absolute;
    top: 17px;
    right: 0;
    width: 109px;
    height: 50px;
    cursor: pointer;
    .menu-bg {
      width: 37px;
      margin-left: 17%;
      display: block;
      padding: 7px;
      border-radius: 50%;
      img {
        display: block;
        width: 100%;
      }
    }
    .menu-bg:hover {
      background: rgba(0,0,0,0.08);
    }
    .menu-list {
      position: absolute;
      width: 100%;
      background: rgba(255,255,255,1);
      border: 1px solid #ccc;
      // height: 200px;
      z-index: 999;
      top: 57px;
      left: -10px;
      // right: 0;
      line-height: 34px;
      border-radius: 7px;
      padding: 11px 0;
      .menu-detail {
        font-size: 13px;
        padding: 0 20px;
        a {
          color: #8a8787;
          text-decoration: none;
          cursor: pointer;
        }
        a:hover {
          color: red;
          font-size: 16px;
        }
      }
      .arrow {
        font-size: 0;
        display: block;
        width: 6px;
        height: 6px;
        background: #fff;
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        position: absolute;
        top: -4px;
        left: 50px;
        transform: rotate(45deg);
        z-index: 9999;
      }
    }
  }
}
.no-data {
  font-size: 26px;
  margin: 30px 0 70px 130px;
  color: #8a8787;
}
.page-body {
  margin: 20px auto 0;
  position: relative;
  .popup {
    width: 234px;
    border-radius: 7px;
    padding: 8px;
    margin: 0 4px 20px 0;
    position: absolute;
    overflow: hidden;
    // background: rgba(0,0,0,0.08);
    cursor: pointer;
    .cover {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .img {
      max-height: 700px;
      overflow: hidden;
      border-radius: 7px;
    }
    img {
      width: 100%;
      display: block;
      border-radius: 7px;
    }
    .word {
      line-height: 16px;
      padding-top: 10px;
      font-size: 13px;
      color: #8a8787;
      width: 50%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .popup:hover {
    .cover {
      background: rgba(0,0,0,0.08);
    }
  }
}
</style>
