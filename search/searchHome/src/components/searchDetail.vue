<template>
  <div class="searchDetail">
    <div class="swiper_box">
      <div class="swiper">
        <p>COLORS</p>
        <div class="swiper_content" id="bigbox">
          <div class="colors" v-for="(item, index) in allColor" :key="index">
            <div class="single_color" v-for="(data, i) in item" :key="i">
              <div class="color_show" :style="{'background': data.colorName}"></div>
              <div class="color_text">{{data.colorName}}</div>
              <div class="color_text">{{data.ratioName}}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="left_btn" id="left_btn" @click="leftBtn">
        <img src="https://www.temaxd.com/img/clients/z.png">
      </div>
      <div class="right_btn" id="right_btn" @click="rightBtn">
        <img src="https://www.temaxd.com/img/clients/y.png">
      </div>
    </div>
    <div class="down_load">
      <a class="btn" href="http://www.likefont.com/">喜欢案例上的字体吗？点我识别下载</a>
    </div>
    <div class="example">
      <div class="title">示例</div>
      <img v-for="(item, index) in imgList" :key="index" :src="'http://spider-x.oss-cn-shanghai.aliyuncs.com/Cards/' + item">
    </div>
    <div class="label">
      <div class="con">
        <span class="title">标签：</span>
        <span class="laber" v-for="(item, index) in labelList" :key="index">{{item}}</span>
      </div>
    </div>
    <div class="recommend">
      <div class="title">相关示例</div>
      <div class="flex" id="flex">
        <div class="pic" v-for="(item, index) in recommendList" :key="index" ref="recpic" @click="recommend(item.src, item.text)">
          <div class="img">
            <img :src="'http://spider-x.oss-cn-shanghai.aliyuncs.com/Cards/' + item.src + '?x-oss-process=image/resize,m_fill,h_280,w_400'">
          </div>
          <div class="words">{{item.text}}</div>
        </div>
      </div>
    </div>
    <div class="back_top" id="back_top" @click="backToTop">
      <a class="s-back-to-top">
        <span class="arrow"></span>
        <span class="line"></span>
      </a>
    </div>
  </div>
</template>

<script>
const PRE_WIDTH = 600
export default {
  name: 'searchDetail',
  data () {
    return {
      allColor: [],
      imgList: [],
      labelList: [],
      recommendList: [],
      imgIndex: 0
    }
  },
  mounted () {
    this.getData(this.$route.query.url, this.$route.query.laber)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.sizeChange)
  },
  methods: {
    recommend (src, laber) {
      let url = window.location.href
      url = url.substring(0, url.indexOf('?'))
      let title = 'TeDesigns'
      history.pushState({ title: title }, title, url + '?url=' + src + '&laber=' + laber)
      location.reload()
    },
    sizeChange () {
      let bigBox = document.getElementById('bigbox')
      bigBox.style.width = this.allColor.length * PRE_WIDTH + 'px'
      let columnWidth = document.documentElement.clientWidth
      let flex = document.getElementById('flex')
      if (columnWidth >= 1700) {
        flex.style.width = '95%'
        this.$nextTick(() => {
          this.$refs.recpic.forEach(v => {
            v.style.width = 400 + 'px'
            v.style.height = 350 + 'px'
            v.getElementsByClassName('img')[0].style.height = 280 + 'px'
            v.getElementsByClassName('img')[0].style.width = 400 + 'px'
          })
        })
      }
      if (columnWidth < 1700 && columnWidth >= 1200) {
        flex.style.width = '95%'
        this.$nextTick(() => {
          this.$refs.recpic.forEach(v => {
            v.style.width = 290 + 'px'
            v.style.height = 240 + 'px'
            v.getElementsByClassName('img')[0].style.height = 200 + 'px'
            v.getElementsByClassName('img')[0].style.width = 290 + 'px'
          })
        })
      }
      if (columnWidth < 1200) {
        flex.style.width = 660 + 'px'
        this.$nextTick(() => {
          this.$refs.recpic.forEach(v => {
            v.style.width = 290 + 'px'
            v.style.height = 240 + 'px'
            v.getElementsByClassName('img')[0].style.height = 200 + 'px'
            v.getElementsByClassName('img')[0].style.width = 290 + 'px'
          })
        })
      }
    },
    handleScroll () {
      let scroll = document.documentElement.scrollTop || document.body.scrollTop
      if (scroll > 0) {
        document.getElementById('back_top').style.bottom = '60px'
        document.getElementById('back_top').style.transition = 'bottom 0.5s'
      }
      if (scroll < 1) {
        document.getElementById('back_top').style.bottom = '-50px'
        document.getElementById('back_top').style.transition = 'bottom 0.5s'
      }
    },
    getData (url, laber) {
      let that = this
      that.$http({
        method: 'GET',
        url: 'https://www.temaxd.com/FSLireSim',
        params: {
          ossImage: url,
          laber: laber
        }
      }).then(function (response) {
        // console.log(response.data)
        let arr = response.data.split('*')
        // 图片列表
        if (arr[1].indexOf(',') === -1) {
          this.imgList.push(arr[1])
        } else {
          this.imgList = arr[1].split('[')[1].split(']')[0].split(', ')
        }
        if (arr[0].indexOf('&') === -1) {
          document.getElementById('right_btn').style.display = 'none'
          document.getElementById('left_btn').style.display = 'none'
          let singelColor = arr[0].split('[{')[1].split('}]')[0].split('}, {')
          let singelObj = {}
          let colorArr = []
          singelColor.forEach((v, k) => {
            singelObj = {
              'ratioName': parseInt(v.split(',')[0].split('"')[3] * 100),
              'colorName': v.split(',')[1].split('"')[3]
            }
            colorArr.push(singelObj)
          })
          // console.log(singelColor)
          this.allColor.push(colorArr)
          this.swiperStyle()
        } else {
          let mainColor = arr[0].split('&')
          // 所有颜色allColor
          mainColor.forEach((m, n) => {
            let singelColor = m.split('[{')[1].split('}]')[0].split('}, {')
            let singelObj = {}
            let colorArr = []
            singelColor.forEach((v, k) => {
              singelObj = {
                'ratioName': parseInt(v.split(',')[0].split('"')[3] * 100),
                'colorName': v.split(',')[1].split('"')[3]
              }
              colorArr.push(singelObj)
            })
            this.allColor.push(colorArr)
          })
          this.swiperStyle()
        }
        // 标签
        this.labelList = arr[2].split(',')
        // 推荐
        arr[3].split(',').forEach((v, k) => {
          if (k < arr[3].split(',').length - 1) {
            this.recommendList.push({
              'src': arr[4].split(',')[k],
              'text': v
            })
          }
        })
      })
    },
    swiperStyle () {
      let bigBox = document.getElementById('bigbox')
      bigBox.style.width = this.allColor.length * PRE_WIDTH + 'px'
      let columnWidth = document.documentElement.clientWidth
      let flex = document.getElementById('flex')
      if (columnWidth < 1700 && columnWidth >= 1200) {
        flex.style.width = '95%'
        this.$nextTick(() => {
          // console.log(this.$refs.recpic)
          this.$refs.recpic.forEach(v => {
            v.style.width = 290 + 'px'
            v.style.height = 240 + 'px'
            v.getElementsByClassName('img')[0].style.height = 200 + 'px'
            v.getElementsByClassName('img')[0].style.width = 290 + 'px'
          })
        })
      }
      if (columnWidth < 1200) {
        flex.style.width = 660 + 'px'
        this.$nextTick(() => {
          this.$refs.recpic.forEach(v => {
            v.style.width = 290 + 'px'
            v.style.height = 240 + 'px'
            v.getElementsByClassName('img')[0].style.height = 200 + 'px'
            v.getElementsByClassName('img')[0].style.width = 290 + 'px'
          })
        })
      }
    },
    leftBtn () {
      let bigBox = document.getElementById('bigbox')
      if (this.imgIndex > 0) {
        this.imgIndex--
        bigBox.style.left = -this.imgIndex * PRE_WIDTH + 'px'
        bigBox.style.transition = 'left 1s'
      }
    },
    rightBtn () {
      let bigBox = document.getElementById('bigbox')
      if (this.imgIndex < this.allColor.length - 1) {
        this.imgIndex++
        bigBox.style.left = -this.imgIndex * PRE_WIDTH + 'px'
        bigBox.style.transition = 'left 1s'
      }
    },
    backToTop () {
      // document.getElementById('back_top').style.display = 'block'
      let timer = null
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn () {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop
        if (oTop > 0) {
          scrollTo(0, oTop - 300)
          timer = requestAnimationFrame(fn)
        } else {
          document.getElementById('back_top').style.display = 'none'
          cancelAnimationFrame(timer)
        }
      })
    }
  }
}
</script>

<style lang="less">
.searchDetail {
  background: #F4F7F6;
  a{
    text-decoration: none;
  }
}
.swiper_box {
  position: relative;
  margin: 0 auto;
  width: 600px;
  .left_btn {
    position: absolute;
    top: 50%;
    margin-top: 7.5px;
    left: -70px;
    cursor: pointer;
    img {
      width: 34px;
      height: 27px;
      display: block;
    }
  }
  .right_btn {
    position: absolute;
    top: 50%;
    margin-top: 7.5px;
    right: -50px;
    cursor: pointer;
    img {
      width: 34px;
      height: 27px;
    }
  }
}
.swiper {
  width: 600px;
  height: 130px;
  padding: 50px 0;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  p {
    height: 40px;
    color: #43C1D7;
    font-weight: 800;
    line-height: 40px;
    text-align: center;
    width: 100%;
    font-family: 'Lato', 'sans-serif';
    font-size: 14px;
  }
  .swiper_content {
    height: 130px;
    position: absolute;
    top: 90px;
    left: 0;
    transition: left 1s;
    .colors {
      width: 600px;
      float: left;
      display: flex;
      justify-content: center;
      .single_color {
        width: 100px;
        margin-right: 10px;
        margin-left: 10px;
        // float: left;
        text-align: center;
        .color_show {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 7px auto;
        }
        .color_text {
          color: #656565;
          font-size: 12px;
          margin-bottom: 2px;
        }
      }
    }
  }
}
.down_load {
  height: 100px;
  width: 100%;
  border-top: 1px solid #E6E6E6;
  border-bottom: 1px solid #E6E6E6;
  .btn {
    display: block;
    width: 200px;
    height: 40px;
    margin: 30px auto;
    line-height: 40px;
    background: #ccc;
    font-size: 12px;
    color: #fff;
    border-radius: 40px;
    text-align: center;
    cursor: pointer;
    transition: background-color 1s;
  }
  .btn:hover {
    background: #13b1cd;
    transition: background-color 1s;
  }
}
.example {
  width: 70%;
  min-width: 660px;
  min-height: 100px;
  margin: 30px auto 0;
  .title {
    margin-bottom: 40px;
    color: #43C1D7;
    font-size: 17px;
    font-weight: 800;
    text-align: center;
  }
  img {
    max-width: 100%;
    margin: 0 auto 20px;
    display: block;
  }
}
.label {
  height: 100px;
  line-height: 100px;
  width: 100%;
  border-top: 1px solid #E6E6E6;
  border-bottom: 1px solid #E6E6E6;
  .con {
    margin: 0 auto;
    width: 65%;
    .title {
      font-size: 18px;
      line-height: 18px;
      color: #000000;
      font-weight: 300;
      font-family: Lato, sans-serif;
      padding-right: 20px;
    }
    .laber {
      border: 1px solid #202121;
      padding: 5px 25px;
      border-radius: 7px;
      margin-right: 25px;
      font-size: 14px;
      font-family: 'Lato', 'sans-serif';
      color: #242424;
      font-weight: 300;
      cursor: pointer;
    }
    .laber:hover {
      border: #13b1cd 1px solid;
      transition: border 0.5s;
    }
  }
}
.recommend {
  width: 95%;
  margin: 0 auto;
  .title {
    margin: 60px 0;
    text-align: center;
    color: #43C1D7;
    font-size: 17px;
    line-height: 27px;
    font-weight: 800;
  }
  .flex {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    padding-bottom: 70px;
    margin: 0 auto;
    .pic {
      width: 400px;
      height: 350px;
      background: #fff;
      margin-bottom: 20px;
      cursor: pointer;
      .img {
        width: 400px;
        height: 280px;
        overflow: hidden;
        img {
          min-height: 280px;
          width: 100%;
        }
      }
      .words {
        margin-top: 15px;
        margin-left: 10px;
        line-height: 25px;
        font-family: 'Lato', 'sans-serif';
        color: #222324;
        font-size: 14px;
      }
    }
  }
}
.back_top {
  // display: none;
  transition: bottom 0.5s;
  position: fixed;
  bottom: -50px;
  width: 30px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: firebrick;
  right: 40px;
  border-radius: 30px;
  color: #fff;
  background: #13b1cd;
  text-shadow: none;
  cursor: pointer;
  opacity: .8;
  a {
    color: #fff;
    text-decoration: none;
    position: relative;
  }
  .arrow {
    position: absolute;
    display: block;
    width: 6px;
    height: 6px;
    transform: rotate(45deg);
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    top: 18px;
    left: 50%;
    margin-left: -4px;
  }
  .line {
    position: absolute;
    display: block;
    width: 1px;
    height: 10px;
    top: 18px;
    left: 50%;
    background: #fff;
    margin-left: -1px;
  }
}
.back_top:hover {
  background: #fff;
  a {
    color: #13b1cd;
  }
  .arrow {
    transform: rotate(45deg);
    border-top: 1px solid #13b1cd;
    border-left: 1px solid #13b1cd;
  }
  .line {
    background: #13b1cd;
  }
}
</style>
