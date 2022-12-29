<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,index) in goodsList" :key="index" @click="goToGoodsDetail(item)">
				<my-good :good="item" :showNum="false"></my-good>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				// 存储商品数据
				goodsList: [],
				// 商品总数量
				total: 0,
				// 节流阀：正在请求下一页数据时为true，否则为false。
				isLoading: false

			};
		},

		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		onReachBottom() {
			// 判断是否所有数据已经加载完毕，当前页码*每页数量>=服务器返回的总数量total，就表示所有数据已经请求完毕了。
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
				return uni.$showMessage('没有更多了哦！')
			}

			// 判断节流阀
			if (this.isLoading) {
				// 说明正在请求下一页数据了,就不再请求。
				return
			}
			// 页码++
			this.queryObj.pagenum++;
			// 发送请求
			this.getGoodsList();
		},
		onPullDownRefresh() {
			// 重置关键数据
			this.queryObj.pagenum = 1,
				this.total = 0,
				this.goodsList = [],
				this.isLoading = false,
				// 重新发起请求
				this.getGoodsList(() =>
					// 停止当前页面下拉刷新。
					uni.stopPullDownRefresh())
		},
		methods: {
			// 请求商品列表数据
			async getGoodsList(cb) {
				// 正在请求下一页数据时为true
				this.isLoading = true;

				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
				// cb回调函数是否存在，如果存在就执行，否则就不执行。
				cb && cb()
				// 请求完成，关闭节流阀
				this.isLoading = false;
				if (res.meta.status !== 200) {
					return uni.$showMessage()
				}
				// 数据请求成功。
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total;
				
			},
			goToGoodsDetail(good) {
				uni.navigateTo({
					url: '/subpackages/goods_detail/goods_detail?goods_id=' + good.goods_id
				})

			}
		}
	}
</script>

<style lang="scss">
.goods-list{
	margin-bottom: 50px;
}
</style>
