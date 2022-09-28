/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		dirs: ['src'],
	},
	pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
};

// const withMDX = require('@next/mdx')({
// 	extension: /\.mdx?$/,
// 	options: {
// 		remarkPlugins: [],
// 		rehypePlugins: [],
// 		providerImportSource: '@mdx-js/react',
// 	},
// });

module.exports = {
	...nextConfig,
	// ...withMDX({
	// 	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	// }),
};
