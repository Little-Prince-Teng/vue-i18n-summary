import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementLocale from 'element-ui/lib/locale'
import {
	Button,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Col,
	Menu,
	MenuItem,
	Container,
	Header,
	Main,
	Aside
} from 'element-ui'

import { i18n } from './locale'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)

ElementLocale.i18n((key, value) => i18n.t(key, value))

window.app = new Vue({
	i18n,
	router,
	render: h => h(App),
}).$mount('#app')
