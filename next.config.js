/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: { and: [/\.(js|ts|md)x?$/] },
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						prettier: false,
						svgo: true,
						svgoConfig: {
							plugins: [
								{
									name: 'preset-default',
									params: { override: { removeViewBox: false } },
								},
							],
						},
						titleProp: true,
					},
				},
			],
		});
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'courses-top.ru',
			},
		],
	},
};

module.exports = nextConfig;
