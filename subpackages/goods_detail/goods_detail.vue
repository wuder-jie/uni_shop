<template>
	<view v-if="goods_info.goods_name">
		<view class="box-con">
			
		
		<!-- 轮播图区域 -->
		<view class="goods-swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
					<view class="swiper-item">
						<image :src="item.pics_big"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品信息区域 -->
		<view class="goods-info">
			<!-- 商品价钱 -->
			<view class="goods-info-money">
				￥{{goods_info.goods_price}}
			</view>
			<!-- 商品标题和收藏图标 -->
			<view class="goods-info-body">
				<view class="goods-info-tit">
					{{goods_info.goods_name}}
				</view>
				<view class="favi">
					<uni-icons type="star" size="16"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="goods-info-foot">
				快递：免运费
			</view>
		</view>
		<!-- 图片展示区域 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		</view>
		<!-- 商品导航区域 -->
		<view class="goods-show">
		<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 存储商品详情信息
				goods_info: {},
				 options: [{
							icon: 'headphones',
							text: '客服'
						}, {
							icon: 'shop',
							text: '店铺',
							infoBackgroundColor:'#007aff',
							infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 2
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: 'rgb(30, 131, 255)',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: 'rgb(0, 83, 184)',
					      color: '#fff'
					    }
					    ]
			}
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsInfo(goods_id)
		},
		methods: {
			async getGoodsInfo(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) {
					return uni.$showMessage()
				}
				// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部
				// 空白间隙的问题,使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;"').replace(/webp/g,'jpg')
				// 数据请求成功。
				this.goods_info = res.message;
			},
			 onClick (e) {
				 if(e.content.text==='购物车'){
					 // 跳转到购物车页面
					 uni.switchTab({
					 	url:'/pages/cart/cart'
					 })
				 }
				 
				    uni.showToast({
				      title: `点击${e.content.text}`,
				      icon: 'none'
				    })
				  },
				  buttonClick (e) {
				    console.log(e)
				    this.options[2].info++
				  }
		}
	}
</script>

<style lang="scss">
	.swiper-item {
		height: 750rpx;
	
	image {
			height: 100%;
			width: 100%;
		}
	}

	.goods-info {
		padding: 10px;

		.goods-info-money {
			color: #c00000;
			margin: 10px 0;

		}

		.goods-info-body {
			display: flex;

			.goods-info-tit {
				font-size: 13px;

			}

			.favi {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: 12px;
				width: 130px;
				height: 50px;
				border-left: 1px solid lightgray;
			}
		}

		.goods-info-foot {
			font-size: 14px;
			color: gray;
			margin-top: 10px;

		}
	}
	.goods-show{
		width: 100%;
		position: fixed;
		bottom: 0;
		left:0;
		
	}
	.box-con{
		padding-bottom: 50px;
	}
</style>
