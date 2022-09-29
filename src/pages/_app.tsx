import type { AppProps } from 'next/app';

import { Layout } from '@/components';

import 'antd/dist/antd.css';
import '../styles/globals.scss';
import '../styles/markdown.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
