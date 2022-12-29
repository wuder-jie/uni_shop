<template>
	<view>
		<!-- 提示按钮 -->
		<view class="address-btn" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 收货地址信息 -->
		<view class="address-info-box" v-else>
			<view class="row1">
				<view class="row1-left">
					姓名：尚先生
				</view>
				<view class="row1-right">
					电话：18538005714
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-tit2">
					地址：
				</view>
				<view class="row2-con2">
					甘肃省平原区务照市***甘肃省平原区务照市***甘肃省平原区务照市***
				</view>
			</view>
		</view>
		<!-- 底部边框 -->
		<view class="address-foot-border">
			<image src="../../static/cart_border@2x.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-address",
		data() {
			return {
				address: {
				cityName:'驻马店市',
				countyName:'平舆县',
				detailInfo:'后刘镇',
				phone:'15139112070',
				name:'尚先生',
				
				}
			};
		},
		methods:{
			chooseAddress(){
				const res=uni.chooseAddress({
					success(res){
						console.log(res);
					}
				})
				console.log(res);
			}
		}
	}
</script>

<style lang="scss">
	.address-foot-border {
		height: 5px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.address-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px
	}

	.address-info-box {
		.row1 {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.row2 {
			display: flex;
			white-space: nowrap;

			.row2-tit2 {}

			.row2-con2 {
				white-space: wrap;
			}

		}
	}
</style>
