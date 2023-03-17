import Vue from 'vue'
import Router from 'vue-router'

import Home from 'views/home.vue'
import Demo from 'views/demo.vue'
import Test from 'views/test.vue'

Vue.use(Router)

const routers = [
	{
		path: '/home',
		name: 'home',
		component: Home,
		meta: {
			icon: 's-home',
			pageName: '首页'
		}
	},
	{
		path: '/demo',
		name: 'demo',
		component: Demo,
		meta: {
			icon: 'menu',
			pageName: '呆萌'
		}
	},
	{
		path: '/test',
		name: 'test',
		component: Test,
		meta: {
			icon: 's-order',
			pageName: '测试'
		}
	},
]

export default new Router({
	routes: [].concat(routers, [{
		path: '/',
		name: 'index',
		redirect: '/home'
	}])
})
export { routers }