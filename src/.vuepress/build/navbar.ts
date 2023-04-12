import { navbar } from 'vuepress-theme-hope';
export default navbar([
	//你也可以通过 YAML front matter 来禁用某个指定页面的导航栏:
	// {
	// 	text: '指南',
	// 	link: '/zh/guide/README.md',
	// 	icon: 'creative',
	// 	activeMatch: '^/zh/guide/$',
	// 	children: [
	// 		{
	// 			text: '指南',
	// 			link: '/zh/guide/README.md',
	// 			icon: 'creative',
	// 			activeMatch: '^/zh/guide/$',
	// 		},
	// 	],
	// },
	{
		text: '首页',
		link: '/index.md',
		icon: 'home',
	},
	{
		text: '文章列表',
		link: '/article/',
		icon: 'list',
	},
	{
		text: '文章分类',
		link: '/category/',
		icon: 'tree',
	},
	{
		text: '文章标签',
		link: '/tag/',
		icon: 'tag',
	},
	{
		text: '时间轴',
		link: '/timeline/',
		icon: 'time',
	},
	{
		text: '关于我',
		link: '/about/index.md',
		icon: 'profile',
	},
	{
		text: '关于网站',
		link: '/site/index.md',
		icon: 'network',
	},
]);
