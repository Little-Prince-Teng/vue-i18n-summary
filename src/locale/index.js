import Vue from 'vue'
import VueI18n from 'vue-i18n'
import defaultLangPackage from './lang/zh-CN'
import elementDefaultLangPackage from 'element-ui/lib/locale/lang/zh-CN'
import JsCookie from 'js-cookie'
import { includes } from 'lodash'

// 必须放在 new VueI18n() 之前安装，否则会报错(获取不到 Vue)
Vue.use(VueI18n)

// 目前支持的语言
const LANGUAGES = {
	ZHCN: { lang: 'zh-CN', text: '中文' },
	EN: { lang: 'en', text: 'English' }
}

// 预设默认语言
export const defaultLang = LANGUAGES.ZHCN.lang
const loadedLanguages = [defaultLang]
document.querySelector('html').setAttribute('lang', defaultLang)

const languageMap = {
	[LANGUAGES.EN.lang]: [
		import(/* webpackChunkName: 'lang-en' */ `./lang/en`),
		import(/* webpackChunkName: 'lang-en' */ `element-ui/lib/locale/lang/en`)
	],
	[LANGUAGES.ZHCN.lang]: [
		import(/* webpackChunkName: 'lang-zh' */ `./lang/zh-CN`),
		import(/* webpackChunkName: 'lang-zh' */ `element-ui/lib/locale/lang/zh-CN`)
	]
}

export const i18n = new VueI18n({
	locale: defaultLang,
	// fallbackLocale: defaultLang, // 预设的语言
	messages: {
		[defaultLang]: {
			...defaultLangPackage,
			// 混入 element-ui 预设语言包
			...elementDefaultLangPackage
		}
	}
})

// 异步加载语言
export function loadLanguageAsync(lang) {
	// 语言不同
	if (i18n.locale !== lang) {
		// 语言尚未加载
		if (!includes(loadedLanguages, lang)) {
			return Promise.all(getLangImports(lang))
				.then(msgs => {
					i18n.mergeLocaleMessage(lang, {
						...msgs[0].default,
						...msgs[1].default
					})
					loadLanguageAsync(lang)
					setI18nLanguage(lang)
				})
		}
		// 语言加载过
		return Promise.resolve(setI18nLanguage(lang))
	}
	// 语言相同
	return Promise.resolve(lang)
}

// 导入第三方组件库的语言包
function getLangImports(lang) {
	if(lang && languageMap[lang]) {
		return languageMap[lang]
	}
	return languageMap[defaultLang]
}

// 设置语言
export function setI18nLanguage(lang) {
	// 设置全局语言
	i18n.locale = lang
	// 修改 http header
	// Vue.http.header.common['Accept-Language'] = lang
	// Cookie 中存储选中的 lang
	JsCookie.set('lang', lang)
	// 设置 html lang 属性
	document.querySelector('html').setAttribute('lang', lang)
	return lang
}