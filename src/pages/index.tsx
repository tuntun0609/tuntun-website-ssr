import Head from 'next/head';
import { GetStaticProps } from 'next';
import { MDX, TypedWriter, Main } from '@/components';

import { getMdData } from '@/lib/mdx';

const options = {
	strings: [
		'Hi, I am TunTun.',
		'A Web front-end developer.',
	],
	typeSpeed: 50,
	backSpeed: 30,
	loop: true,
	loopCount: Infinity,
};

const Home = ({ source }: { source: string }) => (
	<>
		<Head>
			<meta name="description" content="Generated by create next app" />
		</Head>
		<Main>
			<div>
				<div style={{
					fontSize: '48px',
					fontWeight: 'bold',
					margin: '0.4em 0',
				}}>Welcome!</div>
				<TypedWriter
					style={{
						whiteSpace: 'pre',
						color: 'rgb(85, 85, 85)',
						padding: '1.3em 0',
					}}
					options={options}
				></TypedWriter>
			</div>
			<MDX source={source}/>
		</Main>
	</>
);

export const getStaticProps: GetStaticProps = async () => {
	const { source } = await getMdData('index');
	return {
		props: {
			source,
		},
	};
};

export default Home;
