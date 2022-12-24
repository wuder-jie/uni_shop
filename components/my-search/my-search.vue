<template>
	<view id="search">
		<view class="search-box" :style="{backgroundColor:bgColor}">
			<view class="search-ipt-box" :style="{borderRadius:borderRadius +'px'}">
				<uni-icons type="search" size="20"></uni-icons>
				<text>搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			}
		},
		props:{
			bgColor:{
				type:String,
				default:'#c00000',
			},
			borderRadius:{
				type:Number,
				default:18
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		height: 50px;
		width: 100%;
		.search-ipt-box{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 36px;
			background-color: #ffffff;
			border-radius: 18px;
			font-size: 12px;
		}
	}
</style>
