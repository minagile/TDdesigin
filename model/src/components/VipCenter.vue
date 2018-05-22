<template>
  <div class="demo">
    <div class="left">
			<div class="logo">
				<img src="../assets/logo.png" alt="">
				<p>Temaxd会员</p>
				<span><i style="color:#39BEAB;font-style:normal;">15</i>元/月</span>
			</div>
			<ul class="info">
				<li>免费使用免费</li>
				<li>免费使用</li>
				<li>免费使用</li>
				<li>免费使用</li>
				<li>免费使用</li>
				<button>查看会员</button>
			</ul>
			<div class="terms">
				<input type="checkbox" >
				同意并接受《服务条款》
			</div>
		</div>
		<div class="right">
			<div class="user">
				<p><span>{{ Data.userName }}</span>(来自<i>{{ lo }}</i>登录)</p>
			</div>
			<div class="kinds">
				<a :class="{'active': a}" @click="vip.num = '30', vip.time = '月', a = true, b = false, c = false, d = false">月度会员</a>
				<a :class="{'active': b}" @click="vip.num = '100', vip.time = '季', a = false, b = true, c = false, d = false">季度会员</a>
				<a :class="{'active': c}" @click="vip.num = '300', vip.time = '年', a = false, b = false, c = true, d = false">年度会员</a>
				<!-- <a :class="{'active': d}" @click="vip.num = '12', vip.time = '次', a = false, b = false, c = false, d = true">次数会员</a> -->
			</div>
			<span>12345678987654321234567</span>
			<div class="detail">
				<div class="li">
					<p><span>¥<i>{{ vip.num }}</i></span>{{ vip.time }}</p>
					<h3>包{{ vip.time }}</h3>
				</div>
			</div>
			<div class="price">
				<span>¥<i>{{ vip.num }}</i></span>
				<!-- <b>(省<span>12</span>元)</b> -->
			</div>
			<button @click="pay">立即支付</button>
		</div>
    <div class="alert" v-if="isPay">
      <div class="box">
        <p>是否支付成功</p>
        <button @click="yes">是</button>
        <button @click="isPay = false">否</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data () {
		return {
			vip: {
				num: '30',
				time: '月'
			},
			a: true,
			b: false,
			c: false,
      d: false,
      isPay: false,
      data: '',
			Data: {},
			lo: ''
		}
	},
	mounted () {
		this.getInfo()
	},
	methods: {
		getInfo () {
      let that = this
      that.$http.get('https://www.temaxd.com/getUserInfo', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(res => {
        console.log(res.data)
        // this.avatar = res.data.userAvatar
        this.Data = res.data
				if (this.Data.userEmail) {
					this.lo = '邮箱' + this.Data.userEmail
				} else {
					this.lo = '手机号' + this.Data.userPhone
				}
      })
    },
    yes () {
      let that = this
      that.$http.get('http://www.temaxd.com/getAliPayResult', {
        params: {
          outTradeNo: this.data
        }
      }).then(res => {
        console.log(res.data.alipay_trade_query_response.out_trade_no)
        if (res.data.alipay_trade_query_response.sub_msg === '交易不存在') {
          alert('支付未成功')
        } else {
          this.isPay = false
					that.$http.get('http://www.temaxd.com/upgradeMembership', {
						params: {
							levelName: this.vip.time + '会员',
							userId: localStorage.getItem('userId')
						}
					}).then(res => {
						console.log(res.data)
						if (res.data.code === '200') {
							this.getInfo()
							this.$emit('closeClient', false)
						}
					})
        }
      })
    },
		pay () {
      this.isPay = true
      let that = this
      that.$http.get('http://www.temaxd.com/getOutNo', {
				params: {
					userId: localStorage.getItem('userId')
				}
			}).then(res => {
        // console.log(res.data)
        this.data = res.data
        // window.open('http://www.temaxd.com/aliPayHtml?money=' + this.vip.num + '&mchName=VIP'+ this.vip.time +'素材&mchNameText=会员&outTradeNo=' + this.data)
        window.open('http://www.temaxd.com/aliPayHtml?money=0.01' + '&mchName=VIP'+ this.vip.time +'素材&mchNameText=会员&outTradeNo=' + this.data)
      })
		}
	}
}
</script>

<style lang="less" scoped>
.demo {
  width: 1000px;
	height: 600px;
	background: #fff;
	margin: 100px auto;
	border-radius: 5px;
	overflow: hidden;
	.left{
		float: left;
		width: 160px;
		height: 100%;
		border-right: 1px solid #ccc;
		background: rgb(224, 224, 224);
	}
	.right {
		float: left;
		// width: 499px;
	}
}
.left {
	padding: 0 50px;
	position: relative;
	.logo {
		padding: 20px 0 10px 0;
		border-bottom: 1px solid #ccc;
		img {
			width: 80px;
		}
		p {
			font-size: 22px;
		}
	}
	.info {
		padding-top: 20px;
		li {
			line-height: 30px;
			font-size: 14px;
			color: #666;
			text-align: left;
			margin-left: 30px;
			list-style: disc;
		}
		button {
			margin-top: 30px;
			width: 100px;
			height: 30px;
			background: #fff;
			border: 1px solid #aaa;
			border-radius: 5px;
		}
	}
	.terms {
		font-size: 12px;
		position: absolute;
		bottom: 40px;
	}
}
.right {
	padding: 60px 0 0 40px;
	text-align: left;
	.user {
		p {
			span {
				color: #666;
				font-weight: 700;
				padding-right: 10px;
			}
			i {
				font-style: normal;
				color: #39BEAB;
			}
		}
	}
	.kinds {
		padding: 20px 0;
		overflow: hidden;
		a {
			color: #666;
			display: block;
			float: left;
			margin-right: 20px;
			width: 100px;
			text-align: center;
			height: 30px;
			line-height: 30px;
			border: 1px solid #ccc;
		}
		.active {
			border: 1px solid #39BEAB;
			color: #39BEAB;
		}
	}
	span {
		color: #39BEAB;
	}
	.detail {
		padding: 20px 0;
		text-align: center;
		.li {
			width: 140px;
			height: 100px;
			border: 1px solid #ccc;
			p {
				padding-top: 20px;
			}
			i {
				font-style: normal;
				font-size: 24px;
			}
		}
	}
	.price {
		font-size: 12px;
		i {
			font-size: 20px;
			font-style: normal;
			padding: 0 10px 0 4px;
		}
		b {
			font-weight: normal;
		}
	}
	button {
		width: 160px;
		border: 0;
		background: #39BEAB;
		color: #fff;
		height: 40px;
		font-size: 20px;
		border-radius: 4px;
		margin-top: 20px;
		cursor: pointer;
	}
}
.alert {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #00000040;
  .box {
    width: 200px;
    background: #fff;
    height: 80px;
    border-radius: 5px;
    margin: 300px auto;
    p {
      line-height: 50px;
    }
    button {
      width: 60px;
      background: #ccc;
      height: 25px;
      font-size: 14px;
      border: 0;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
