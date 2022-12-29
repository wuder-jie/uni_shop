// 管理购物车状态。
export default {
	state: {
		// 存储购物车数据。
		// 每个商品的信息对象{goods_id,goods_name,goods_count,goods_price,goods_small_logo,goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	},
	mutations: {
		// 添加购物车

		ADDCART(state, goods) {
			// 判断购物车中是否已经有了该商品。
			const gdResult = state.cart.find(item => item.goods_id === goods.goods_id)
			if (!gdResult) {
				// 否则添加到数组中。
				state.cart.push(goods)
			} else {
				// 如果有了，直接goods_count++，
				gdResult.goods_count++
			}
			this.commit('setCartStorage')
		},
		setCartStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新某个商品状态
		updateGoodsState(state, good) {
			const res = state.cart.find(x => x.goods_id === good.goods_id)
			// 更改商品状态
			if (res) {
				res.goods_state = good.goods_state;
			}
			// 持久化到本地
			this.commit('setCartStorage')
		},
		// 更新商品数量
		updateGoodsCount(state, goods) {
			const res = state.cart.find(x => x.goods_id = goods.goods_id);
			if (res) {
				res.goods_count = goods.goods_count;

			}
			// 持久化到本地
			this.commit('setCartStorage')
		},
		// 根据id删除对应商品
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			// 持久化到本地
			this.commit('setCartStorage')
		},
		// 更新商品状态
		updateGoodsState2(state,newGoodsState){
			state.cart.forEach(item=>item.goods_state=newGoodsState)
			// 持久化到本地
			this.commit('setCartStorage')
		},
		

	},
	getters: {
		// 计算商品购物车总数量。
		cartCount(state) {
			return state.cart.reduce((total,item)=>total+=item.goods_count,0);
		},
		// 已勾选商品总数量。goods_state为true
		checkCount(state) {
			const arr=state.cart.filter(x => x.goods_state);
			console.table(arr)
			const t=arr.reduce((total, item) => total += item.goods_count, 0);
			console.log(t);
			return t;
		},
		// 计算已勾选的商品总价格
		 checkedGoodsAmount(state){
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count*item.goods_price,0).toFixed(2);
		 }
	},
}
