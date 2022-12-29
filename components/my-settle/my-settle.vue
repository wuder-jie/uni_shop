<template>
	<view>
		<view class="my-settle-container">
			<!-- 全选 -->
			
				<label class="radio" for="radio" @click="changeRadio">
					<radio color="#c00000" :checked="fullCheck"/><text id="radio">全选</text>
				</label>
		
			<!-- 合计 -->
			<view class="settle-center">
				<text>合计：</text>
				<view class="box1">
					￥{{checkedGoodsAmount}}
				</view>
			</view>
			<!-- 结算 -->
			<view class="settle-right">
				结算（{{checkCount}}）
			</view>
		</view>
	</view>
</template>

<script>
	// todo 全选和单选有逻辑错误。
	import {mapGetters} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters(['checkCount','cartCount','checkedGoodsAmount']),
		
			// 计算是否是全选状态，true：全选；false：不全选
			fullCheck(){
				return this.checkCount===this.cartCount
			}
			
		},
		methods:{
			changeRadio(){
				this.$store.commit('updateGoodsState2',!this.fullCheck)
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: ghostwhite;
	width: 100%;
	height: 50px;
	font-size: 14px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.radio{
		height: 100%;
		line-height: 50px;
	}
	.settle-center{
		display: flex;
		align-items: center;
		.box1{
			font-size: 15px;
			color: #C00000;
		}
	}
	.settle-right{
		background-color: #C00000;
		height: 100%;
		color: white;
		text-align: center;
		padding: 0 10px;
		min-width: 100px;
		line-height: 50px;
	}
	}
</style>