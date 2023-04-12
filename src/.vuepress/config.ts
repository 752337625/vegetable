// .vuepress/config.ts
import { defineUserConfig } from 'vuepress';
import { hopeTheme } from 'vuepress-theme-hope';
import navbar from './build/navbar';
import { viteBundler } from 'vuepress';
import { searchProPlugin } from 'vuepress-plugin-search-pro';
export default defineUserConfig({
	plugins: [
		searchProPlugin({
			// 索引全部内容
			indexContent: true,
			delay: 3000,
			historyCount: 5,
			hotReload: true,
			// 为分类和标签添加索引
			customFields: [
				{
					getter: ({ frontmatter }) => frontmatter.category as string[],
					formatter: '分类：$content',
				},
				{
					getter: ({ frontmatter }) => frontmatter.tag as string[],
					formatter: '标签：$content',
				},
				{
					getter: ({ frontmatter }) => frontmatter.author as string[],
					formatter: '作者：$content',
				},
			],
		}),
	],
	bundler: viteBundler({
		viteOptions: {
			build: {
				target: 'es2015',
				cssTarget: 'chrome61',
				sourcemap: false,
				assetsInlineLimit: 5000, //禁止将文件转base64
				// minify: 'terser',
				// terserOptions: {
				// 	compress: {
				// 		drop_console: true,
				// 		drop_debugger: true,
				// 		pure_funcs: ['console.log', 'debugger'],
				// 	},
				// 	format: {
				// 		comments: false,
				// 	},
				// },
				// chunk 大小警告的限制
				chunkSizeWarningLimit: 2000,
			},
		},
	}),
	base: '/blog/',
	lang: 'zh-CN',
	title: '𝓜𝓻. 𝓦𝓪𝓷𝓰',
	head: [
		[
			'meta',
			{
				name: 'viewport',
				content:
					'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover',
			},
		],
		['link', { rel: 'manifest', href: '/blog/manifest.webmanifest' }],
		['meta', { name: 'format-detection', content: 'telephone=no, email=no' }],
		['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
		['meta', { name: 'apple-touch-fullscreen', content: 'yes' }],
		['meta', { name: 'apple-mobile-web-app-title', content: '𝓜𝓻. 𝓦𝓪𝓷𝓰' }],
	],
	description: '个人博客',
	pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],
	shouldPreload: true,
	shouldPrefetch: false,
	host: 'localhost',
	port: 9090,
	theme: hopeTheme({
		encrypt: {
			config: {
				'/site/': ['12345678'], //这会加密整个 guide 目录，并且两个密码都是可用的
			},
		},
		breadcrumb: true,
		breadcrumbIcon: true,
		prevLink: true,
		nextLink: true,
		titleIcon: true,
		pageInfo: ['Author', 'Category', 'Tag', 'Date'],
		lastUpdated: true, //禁止显示时间
		contributors: false,
		editLink: true, //禁止编辑页面
		iconAssets: 'iconfont', //图标支持
		darkmode: 'toggle', //主题切换
		pure: false, //纯洁模式
		backToTop: true, //返回顶部按钮
		fullscreen: true, //全屏
		hostname: 'https://www.luosifa.top/blog',
		logo: '/logo/apple-touch-icon-180x180.png',
		repo: 'https://github.com/752337625',
		repoLabel: 'GitHub',
		docsDir: 'monorepo/blog/src',
		docsBranch: 'master',
		docsRepo: 'https://github.com/752337625/wanda-btigade-direct',
		author: [
			{
				name: '𝓜𝓻. 𝓦𝓪𝓷𝓰',
				url: '/blog/about',
			},
		],
		displayFooter: true,
		copyright: 'MIT Licensed | Copyright © 2022-present <a href=" /blog/about" >𝓜𝓻. 𝓦𝓪𝓷𝓰</a>',
		footer:
			'<a href="http://beian.miit.gov.cn/" target="_blank">备案号: 京ICP备2022001662号</a> | <a href="/blog/site">关于网站</a>',
		blog: {
			articlePerPage: 20,
			description: '他们说，生活总是比较容易',
			roundAvatar: true,
			// timeline: '懒了一天',
			// sidebarDisplay: 'always',
			articleInfo: ['Author', 'Category', 'Tag', 'Date'],
			intro: '/about',
			medias: {
				Email: '',
				QQ: '',
				Qzone: '',
				Gmail: '',
				Wechat: '',
				GitHub: 'https://github.com/752337625',
				Gitee: '',
			},
		},
		plugins: {
			components: {
				components: ['BiliBili', 'Badge', 'AudioPlayer'],
			},
			//图片预览配置项
			photoSwipe: {},
			//代码复制配置项
			copyCode: {
				showInMobile: true,
				duration: 500,
			},
			git: true,
			comment: {
				provider: 'Giscus',
				repo: '752337625/wanda-btigade-direct',
				repoId: 'R_kgDOHqrkEA',
				category: 'Announcements',
				categoryId: 'DIC_kwDOHqrkEM4CR063',
				inputPosition: 'bottom',
			},
			feed: {
				atom: true,
				json: true,
				rss: true,
			},
			mdEnhance: {
				tasklist: true, //任务列表
				include: true, //导入文件
				tabs: true, //选项卡启用
				align: true,
				codetabs: true,
				demo: true,
				flowchart: true,
				footnote: true,
				katex: true,
				mermaid: true,
				presentation: true, //幻灯片
				sub: true, //上角标
				sup: true, //下角标
				imageLazyload: true, // 启用图片懒加载
				imageMark: true, // 启用图片标记
				imageSize: true, // 启用图片大小
				container: true, // 自定义容器
				//imageTitle: true, // 启用图片标题
			},
			blog: {
				excerpt: true, //是否为每个页面生成摘录。
			},
			pwa: {
				showInstall: true,
				themeColor: '#ffffff',
				cachePic: true,
				appendBase: true,
				update: 'available',
				favicon: '/favicon.ico',
				maxSize: 5120,
				maxPicSize: 3072,
				apple: {
					icon: '/logo/apple-touch-icon-152x152.png',
					statusBarColor: 'white',
					maskIcon: '/logo/safari-pinned-tab.svg',
				},
				msTile: {
					image: '/logo/mstile-144x144.png',
					color: '#2b5797',
				},
			},
		},
		sidebar: false,
		navbar,
		navbarAutoHide: 'always',
		hideSiteNameOnMobile: true,
		navbarLayout: {
			left: ['Brand'],
			center: ['Links'],
			right: ['Language', 'Repo', 'Outlook', 'Search'],
		},
	}),
});
