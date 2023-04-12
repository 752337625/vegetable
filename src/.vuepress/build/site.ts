import { headCN } from './head';
export const site: any = {
	lang: 'zh-CN',
	title: '𝓜𝓻. 𝓦𝓪𝓷𝓰',
	description: '个人博客',
	head: headCN,
	pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],
	shouldPreload: true,
	shouldPrefetch: true,
	host: 'localhost',
	port: 9090,
	navbarAutoHide: 'always', //是否在向下滚动时自动隐藏导航栏。
	blog: {
		timeline: '懒了一天',
		titleIcon: true,
		lastUpdated: false,
		contributors: false,
		articleInfo: ['Author', 'Category', 'Tag', 'Date'],
		intro: '/about',
		sidebarDisplay: 'mobile',
		links: {
			QQ: 'http://wpa.qq.com/msgrd?v=3&uin=1178522294&site=qq&menu=yes',
			Qzone: 'https://1178522294.qzone.qq.com/',
			Gmail: 'mailto:mister-hope@outlook.com',
			Zhihu: 'https://www.zhihu.com/people/mister-hope',
			Steam: 'https://steamcommunity.com/id/Mr-Hope/',
			Weibo: 'https://weibo.com/misterhope',
			GitHub: 'https://github.com/Mister-Hope',
			Gitee: 'https://gitee.com/Mister-Hope',
		},
	},
};
