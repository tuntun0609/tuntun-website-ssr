import type { AppProps } from 'next/app';
import Router from 'next/router';
import nProgress from 'nprogress';

import { Layout } from '@/components';

import 'antd/dist/antd.css';
import '@/styles/nprogress.scss';
import '../styles/globals.scss';
import '../styles/markdown.scss';
import Head from 'next/head';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

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
