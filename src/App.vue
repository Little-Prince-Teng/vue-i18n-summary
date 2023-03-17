<template>
	<div id="app">
		<div class="layout">
			<el-header>
				<ul>
					<aside-item
						v-for="r in routers"
						:key="r.name"
						:icon="r.meta.icon"
						:href="r.path"
						:active-on="r.name"
					>{{ $t(`aside.${r.name}`) }}</aside-item>
				</ul>
				<el-dropdown trigger="click" placement="bottom-end">
					<span style="cursor: pointer;">{{ lang.text }}
						<i class="el-icon-arrow-down"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item
							v-for="language in languages"
							:key="language.lang"
							@click.native="changeLang(language)"
						>{{ language.text }}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>
			<el-container>
				<el-main>
					<router-view />	
				</el-main>
			</el-container>
		</div>
	</div>
</template>

<script>
import AsideItem from '@/components/common/aside-item.vue'
import { loadLanguageAsync, setI18nLanguage, defaultLang, LANGUAGES } from './locale'
import { get, findKey, find } from 'lodash'
import JsCookie from 'js-cookie'
import { routers } from './router'

export default {
	name: 'App',
	components: {
		AsideItem
	},
	data () {
		return {
			routers,
			languages: [
				{ lang: 'zh-CN', text: '中文' },
				{ lang: 'en', text: 'English' }
			]
		}
	},
	mounted() {
		this.setLocaleLang()
	},
	computed: {
		lang() {
			return find(this.languages, { lang: this.$i18n.locale }) || this.languages[0]
		}
	},
	methods: {
		async setLocaleLang() {
			const localeLang = get(this.$route, 'query.lang') || JsCookie.get('lang') || defaultLang

			if (
				localeLang &&
				findKey(LANGUAGES, { lang: localeLang }) &&
				localeLang !== this.$i18n.locale
			) {
				try {
					await loadLanguageAsync(localeLang)
				} catch (err) {
					console.log(err)
				}
			} else {
				setI18nLanguage(localeLang)
			}
		},

		async changeLang(language) {
			const { lang } = language
			JsCookie.set('lang', lang)

			await loadLanguageAsync(lang)
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100%;
	width: 100%;
	background-color: #1a1a1a;
}

body {
	margin: 0;
}

.el-aside ul {
margin: 0;
padding: 0;
}

.layout {
	height: 100vh;
	display: flex;
	flex-direction: column;
}

.el-header {
	height: 60px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid rgba(84, 84, 84, .48);
}

.el-header ul {
	display: flex;
	margin-right: 36px;
}

.el-container {
	flex: 1;
	display: flex;
}

.el-aside {
	width: 200px;
	padding: 10px;
}

.el-main {
	flex: 1;
	padding: 10px;
}

.el-main .title {
	margin: 0 auto;
	max-width: 960px;
	line-height: 1.25;
	text-align: center;
	font-size: 76px;
	font-weight: 900;
	background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent
}

</style>
