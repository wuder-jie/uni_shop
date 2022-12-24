<template>
	<view>
		<my-search @click.native="goSearch"></my-search>
		<view class="scroll-box">
			<!-- 左侧滚动条 -->
			<scroll-view scroll-y="true" class="left-scroll-box" :style="{height:wh+'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scroll-item',index===active?'active':'']" @click="leftHandle(index)">
						{{item.cat_name}}</view>
				</block>

			</scroll-view>
			<!-- 右侧滚动条 -->
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="right-scroll-box" :style="{height:wh+'px'}">
				<view class="right-scroll-box" v-for="(item2,index2) in cateLevel2" :key="index2">
					<!-- 右侧二级分类标题 -->
					<view class="right-title">
						/{{item2.cat_name}}/
					</view>
					<!-- 三级分类 -->
					<view class="right-lv3-list">
						<view class="right-lv3-item" v-for="(item3,index3) in item2.children" :key="index3"
							@click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 可用窗口高度
				wh: 0,
				// 存储分类数据。
				cateList: [],
				// 当前选中的分类。
				active: 0,
				// 存储二级分类
				cateLevel2: [],
				// 竖向滚动条距离顶部的位置。
				scrollTop: 0
			};

		},
		onLoad() {
			const sys = uni.getSystemInfoSync()
			this.wh = sys.windowHeight - 50
			this.getCateList()
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/subpackages/search/search'
				})
			},
			// 请求分类数据
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories');
				if (res.meta.status !== 200) {
					return uni.$showMessage()
				}

				// 数据请求成功。
				this.cateList = res.message;
				this.cateLevel2 = res.message[0].children
			},
			leftHandle(index) {
				this.active = index
				// 当用户切换一级分类时，为为二级分类立即重新赋值
				this.cateLevel2 = this.cateList[index].children
				// 为滚动条重新赋值
				this.scrollTop = this.scrollTop === 0 ? 1 : 0;
			},
			gotoGoodsList(goods) {
				// 点击三级分类跳转
				uni.navigateTo({
					url: `/subpackages/goods_list/goods_list?cid=${goods.cat_id}`
				})
			},

		}
	}
</script>

<style lang="scss">
	.scroll-box {
		display: flex;
	}

	.left-scroll-box {
		width: 120px;
	}

	.left-scroll-item {
		height: 60px;
		line-height: 60px;
		text-align: center;
		background-color: whitesmoke;
		font-size: 12px;

		&.active {
			position: relative;
			background-color: ghostwhite;

			&::before {
				content: '';
				display: block;
				width: 3px;
				height: 30px;
				border-radius: 50%;
				background-color: #c00000;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);

			}
		}
	}

	.right-title {
		text-align: center;
		font-size: 14px;
		font-weight: bold;
		margin: 5px 5px;
	}

	.right-lv3-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		justify-content: space-between;
	}

	.right-lv3-item {
		display: flex;
		flex-direction: column;
		margin: 5px;
		text-align: center;

		image {
			width: 60px;
			height: 60px;
		}

		text {
			font-size: 12px;
		}
	}
</style>
