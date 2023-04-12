const common = [
	[
		'meta',
		{
			name: 'viewport',
			content:
				'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover',
		},
	],
	['meta', { name: 'format-detection', content: 'telephone=no, email=no' }],
	['meta', { name: 'theme-color', content: '#4374A5' }],
	['meta', { name: 'msapplication-TileImage', content: '/blog/logo/mstile-144x144.png' }],
	['meta', { name: 'msapplication-TileColor', content: '#2b5797' }],
	['link', { rel: 'mask-icon', href: '/blog/logo/safari-pinned-tab.svg', color: '#b9652d' }],
	[
		'link',
		{
			rel: 'apple-touch-icon-precomposed',
			sizes: '57x57',
			href: '/blog/logo/apple-touch-icon-57x57.png',
		},
	],
	[
		'link',
		{
			rel: 'apple-touch-icon-precomposed',
			sizes: '60x60',
			href: '/blog/logo/apple-touch-icon-60x60.png',
		},
	],
	[
		'link',
		{
			rel: 'apple-touch-icon-precomposed',
			sizes: '72x72',
			href: '/blog/logo/apple-touch-icon-72x72.png',
		},
	],
	[
		'link',
		{
			rel: 'apple-touch-icon-precomposed',
			sizes: '76x76',
			hhref: '/blog/logo/apple-touch-icon-76x76.png',
		},
	],

	[
		'link',
		{
			rel: 'apple-touch-icon-precomposed',
			sizes: '120x120',
			href: '/blog/logo/apple-touch-icon-120x120.png',
		},
	],
	[
		'link',
		{
			rel: 'apple-touch-icon-precomposed',
			sizes: '114x114',
			href: '/blog/logo/apple-touch-icon-114x114.png',
		},
	],
	[
		'link',
		{
			rel: 'apple-touch-icon-precomposed',
			sizes: '152x152',
			href: '/blog/logo/apple-touch-icon-152x152.png',
		},
	],
	[
		'link',
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/blog/logo/apple-touch-icon-180x180.png',
		},
	],
	['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
	['meta', { name: 'apple-touch-fullscreen', content: 'yes' }],
];
export const headCN: any[] = [
	...common,
	['meta', { name: 'apple-mobile-web-app-title', content: '𝓜𝓻. 𝓦𝓪𝓷𝓰' }],
];
