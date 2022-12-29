<template>
	<view>
		
	<view class="cart-container" v-if="cart.length!==0">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 标题 -->
		<view class="cart-title">
			<!-- 图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 文本 -->
			<text>购物车</text>
		</view>
		<!-- 列表数据 -->
		<view class="cart-list">

			<uni-swipe-action>
				<!-- 基础用法 -->
				<block v-for="(good,index) in cart" :key="index">
					<uni-swipe-action-item :right-options="options" @click="onClick(good)">
						<my-good 
						:good="good" 
						:showRadio="true" 
						:showNum="true"
						@radio-change="radioHandler" 
						@num-change="numHandler">
							</my-good>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		</view>
		
		<!-- 结算组件 -->
		<my-settle></my-settle>
		
	</view>
	<!-- 没有商品时显示 -->
	<view class="no-goods" v-else>
		<image src="/static/cart_empty@2x.png"></image>
		<text>空空如也~</text>
	</view>
	</view>
</template>

<script>
	import cartBadge from '../../mixins/cartBadge.js'

	export default {
		mixins: [cartBadge],
		computed: {
			cart() {
				return this.$store.state.cart.cart;
			}
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		methods: {
			onClick(e) {
				this.$store.commit('removeGoodsById',e.goods_id)
				
			},
		
			// 单选框事件回调
			radioHandler(e) {
				this.$store.commit('updateGoodsState', e)
			},
			change() {},
			// 商品数量改变
			numHandler(val) {
				this.$store.commit('updateGoodsCount', val)
				this.getTotal()
			},
			
		}


	}
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 50px;
	}
	.cart-title {
		display: flex;
		align-items: center;
		height: 40px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		text {
			font-size: 14px;
			margin-left: 10px;

		}
	}
	.no-goods{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 200px;
		image{
			width: 90px;
			height: 90px;
			margin-bottom: 10px;
		}
	}
</style>
