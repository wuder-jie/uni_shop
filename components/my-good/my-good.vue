<template>
	<view class="goods-item">
		<!-- 左侧图片区域 -->
		<view class="goods-item-left">
			<image :src="item.goods_small_logo||defaultImg" class="goods-img"></image>
		</view>
		<!-- 右侧文本 -->
		<view class="goods-item-right">
			<view class="goods-title">
				{{item.goods_name}}
			</view>
			<view class="goods-money">
				￥{{item.goods_price | toFix}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-good",
		props: {
			item: {
				type: Object,
				default: {}
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

			.goods-title {
				font-size: 14px;
			}

			.goods-money {
				color: red;
			}
		}
	}
</style>
