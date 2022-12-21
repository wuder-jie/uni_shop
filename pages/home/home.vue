<template>
	<view id="home">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
			class="swiper">
			<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
				<navigator class="swiper-item"
					:url="'../../subpackages/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>

		</swiper>
	<!-- 导航栏 -->
	<view class="nav-list">
		<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navHandler(item)">
			<image :src="item.image_src" mode=""></image>
		</view>
	</view>
	<!-- 楼层 -->
	<view class="floor-list">
		<!-- 每一层楼 -->
		<view class="floor-item" v-for="(item,index) in floorList" :key="index">
			<!-- 标题 -->
			<image class="floor-title" :src="item.floor_title.image_src" mode=""></image>
			<view class="floor-img-box" >
				<!-- 左侧图片 -->
				<navigator class="left-img" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width +'rpx'}"></image>
				</navigator>
				<!-- 右侧图片 -->
				<view class="right-img"  >
					<navigator class="right" v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2!==0" :url="item2.url">
						<image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width+'rpx'}"></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 存储轮播图数据
				swiperList: [],
				// 存储导航栏数据
				navList: [],
				// 存储楼层数据
				floorList:[]
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			// 请求轮播图数据
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata');
				if (res.meta.status !== 200) {
					return uni.$showMessage()
				}
				// 数据请求成功。
				this.swiperList = res.message;
				uni.$showMessage('数据加载成功')
			},

			// 请求导航栏数据
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems');
				if (res.meta.status !== 200) {
					return uni.$showMessage()
				}
				// 数据请求成功。
				this.navList = res.message;
			},
			navHandler(item){
				// 根据name进行跳转。
				if(item.name==='分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			// 请求楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata');
				if (res.meta.status !== 200) {
					return uni.$showMessage()
				}
				res.message.forEach(item=>{
					item.product_list.forEach(mer=>{
						mer.url=`/subpackages/goods_list/goods_list?+${mer.navigator_url.split('?')[1]}`
					})
				})
				// 数据请求成功。
				this.floorList = res.message;
			},
			
		},
	}
</script>

<style lang="scss">
	#home {
		.swiper {
			height: 330rpx;

			.swiper-item,
			image {
				height: 100%;
				width: 100%;
			}
		}
		.nav-list{
			display: flex;
			justify-content: space-around;
			margin: 30rpx 0;
			.nav-item image{
				width: 128rpx;
				height: 140rpx;
			}
		}
		.floor-title {
			width: 100%;
			height: 60rpx;
		}
		.floor-img-box{
			display: flex;
			padding: 5rpx;
		}
		
		.right-img{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	
	}
</style>
