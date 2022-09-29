import Head from 'next/head';
import { GetStaticProps } from 'next';
import { MDX } from '@/components';

import { postFilePaths, MD_PATH, getMdData } from '@/lib/mdx';

import style from '../styles/index.module.scss';

const Home = ({ postFilePaths, MD_PATH, ...data }: any) => {
	console.log(1111);
	return (
		<div className={style.container}>
			<Head>
				<title>tun website</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/tuntun.jpg" />
			</Head>
			<div className={style.main}>
				<MDX {...data.source}/>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const data = await getMdData('index');
	return {
		props: {
			postFilePaths,
			MD_PATH,
			...data,
		}, // will be passed to the page component as props
	};
};

export default Home;
