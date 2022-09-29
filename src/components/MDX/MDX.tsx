import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import monokai from 'react-syntax-highlighter/dist/esm/styles/hljs/monokai';

const Code = ({className, children} : { className?: any, children?: any }) => {
	const language = className?.replace('language-', '') ?? 'javascript';
	console.log(language);
	return (
		<SyntaxHighlighter language={language}>
			{children}
		</SyntaxHighlighter>
	);
};

export const MDX = (props: MDXRemoteProps) => (
	<div className='tun-markdown'>
		<MDXRemote {...props} components={{
			code: Code,
		}}/>
	</div>
);
