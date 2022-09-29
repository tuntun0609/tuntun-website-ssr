import type { AppProps } from 'next/app';

import { Layout } from '@/components';

import 'antd/dist/antd.css';
import '../styles/globals.scss';
import '../styles/markdown.scss';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>tun website</title>
				<link rel="icon" href="/tuntun.jpg" />
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default MyApp;
