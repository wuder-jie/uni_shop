<template>
	<view>
		<view class="search-list">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="请输入搜索内容">
			</uni-search-bar>
		</view>
		<!-- 搜索建议 -->
		<view class="sugg-list" v-if="searchResults.length!==0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="goGoodsDetail(item)">
				<view class="sugg-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="forward" size="16"></uni-icons>

			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="16" @click="clean"></uni-icons>
			</view>
			<uni-tag :text="item" v-for="(item,index) in histories" :key="index" @click="goToGoodsList(item)"></uni-tag>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				// 存储输入框文本
				kw: '',
				// 存储搜索结果
				searchResults: [],
				// 存储搜索历史
				historyList: ['a', 'app', 'apple']
			};
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			// 组件加载完成就获取缓存中的历史数据。如果刚开始没有历史记录，就返回空数组。
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')

		},
		methods: {
			
			goToGoodsList(kw){
				// 点击历史，跳转到商品列表页面
				uni.navigateTo({
					url:'/subpackages/goods_list/goods_list?query='+kw
				})
			},
			// 清空搜索历史
			clean(){
				this.historyList=[]
				// 覆盖本地存储中的kw
				uni.setStorageSync('kw' ,'[]')
			},
			goGoodsDetail(item) {
				// 跳转到商品详情页
				uni.navigateTo({
					url: `/subpackages/goods_detail/goods_detail?goods_id=${item.goods_id}`
				})
			},
			input(e) {
				// 清除上次的延时器
				clearTimeout(this.timer)
				// 防抖处理
				this.timer = setTimeout(() => {
					this.kw = e;
					// 发起请求
					this.getSearchList()
					// 保存搜索历史
					this.saveSearchHistory()

				}, 500)
			},

			saveSearchHistory() {
				// this.historyList.push(this.kw)
				const set = new Set(this.historyList);
				// 先删除set集合中已经存在的，
				set.delete(this.kw)
				// 再重新存储，以解决重复和顺序问题
				set.add(this.kw)
				this.historyList = Array.from(set)
				// 持久化存储历史记录
				uni.setStorageSync('kw', JSON.stringify(this.historyList));

			},

			async getSearchList() {
				// 判断是否为空
				if (this.kw.length === 0) {
					this.searchResults = []
					return;
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				if (res.meta.status !== 200) {
					uni.$showMessage('数据加载失败，请检查网络!')
				}
				this.searchResults = res.message;
			}
		}
	}
</script>

<style lang="scss">
	.search-list {
		position: sticky;
		top: 0;
		z-index: 999;
		background-color: #C00000;
	}

	.sugg-list {
		padding: 5px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 15px;
			border: 1rpx solid ghostwhite;
			box-shadow: 2px 1px 5px ghostwhite;

			.sugg-name {
				// 让文本一行显示，并且超出部分隐藏
				white-space: nowrap;
				overflow: hidden;
				// 超出部分用...代替
				text-overflow: ellipsis;
				font-size: 12px;
			}
		}
	}

	.history-box {
		padding: 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 13px;
			height: 40px;
			padding: 5px;
		}

		.uni-tag {
			margin-top: 5px;
			margin-right: 5px;

		}
	}
</style>
