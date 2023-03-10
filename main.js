import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// 引入网络请求配置对象。
import {
	$http
} from '@escook/request-miniprogram'
import store from 'store/store.js'

// 挂载到uni上。
uni.$http = $http;
uni.$http.baseUrl = 'https://api-hmugo-web.itheima.net';
// 请求拦截器。
$http.beforeRequest = function(options) {
uni.$showMessage("加载中...")
}
// 响应拦截器。
$http.afterRequest = function() {
}
uni.$showMessage = function(title = "数据加载失败！", duration = 1500) {
	 uni.showToast({
		title: title,
		duration: duration,
		icon: "none"
	})
}
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
