<template>
	<view class="goods-item">
		<!-- 左侧图片区域 -->
		<view class="goods-item-left">
			<radio :checked="good.goods_state" color="#c00000" v-if="showRadio" @click="clickRadioHandler"></radio>
			<image :src="good.goods_small_logo||defaultImg" class="goods-img"></image>
		</view>
		<!-- 右侧文本 -->
		<view class="goods-item-right">
			<view class="goods-title">
				{{good.goods_name}}
			</view>
		<view class="goods-money-cou">
			<view class="goods-money">
				￥{{good.goods_price | toFix}}
			</view>
			<uni-number-box :min="1" :value="good.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-good",
		props: {
			good: {
				type: Object,
				default: {}
			},
			// 控制radio的显示与隐藏。默认隐藏。
			showRadio: {
				type: Boolean,
				default: false
			},
			// 控制加减组件的显示与隐藏
			showNum:{
				type:Boolean,
				default:false
			}
		},
		filters: {
			// 过滤器保留小数点后两位小数。
			toFix(num) {
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {
				// 商品默认图片
				defaultImg: 'http://hd.wallpaperswide.com/thumbs/assassins_creed_mirage_video_game_2023-t2.jpg'
			};
		},
		methods:{
			clickRadioHandler(){
				this.$emit('radio-change',{
					goods_id:this.good.goods_id,
					goods_state:!this.good.goods_state
				})
			},
			numChangeHandler(goods_count_box){
				
				this.$emit('num-change',{
					goods_id:this.good.goods_id,
					// +可以把字符串转数字。
					goods_count:Number(goods_count_box)
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		border: 1rpx solid ghostwhite;
		border-radius: 4px;
		box-shadow: 1px 1px 5px lightgray;
		margin: 5px;

		.goods-item-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 8px;

			.goods-img {
				width: 100px;
				height: 100px;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			.goods-title {
				font-size: 14px;
			}

			.goods-money {
				color: red;
			}
		}
	}
	.goods-money-cou{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 5px;
	}
</style>
