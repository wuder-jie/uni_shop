	import { mapGetters } from 'vuex'
	export default{
		computed:{
			...mapGetters(['cartCount'])
		},
		onShow(){
			this.getTotal()
		},
		watch:{
			cartCount(){
				if(this.cartCount<=0){
					uni.hideTabBarRedDot({
					index:2,
					})
				}
			}
		},
		methods:{
			getTotal(){
				if(this.cartCount<=0){
					return
				}
				uni.setTabBarBadge({
					index:2,
					text:this.cartCount+''
				})
			}
		}
	}