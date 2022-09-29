import { useMemo, useRef } from 'react';
// import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote';
// import SyntaxHighlighter from 'react-syntax-highlighter';
import { getMDXComponent } from 'mdx-bundler/client';
// import monokai from 'react-syntax-highlighter/dist/esm/styles/hljs/monokai';

const Code = (props: React.ComponentPropsWithRef<'code'>) => {
	const textRef = useRef<HTMLDivElement>(null);
	const language = props.className?.replace('language-', '') ?? 'javascript';
	return (
		<code data-code-type={language && 'code-block'}>
			{language ? (
				<div ref={textRef}>
					{props.children}
				</div>
			) : (
				<span>{props.children}</span>
			)}
		</code>
	);
};

const MDXComponents = {
	a: ({...props}) => (
		props.className && props.className.indexOf('title-link') !== -1
			? <a {...props}></a>
			: <a target={'_blank'} rel='noreferrer' {...props}></a>
	),
	code: Code,
};

export const MDX = ({ source }: { source: string; }) => {
	const Component = useMemo(() => getMDXComponent(source), [source]);
	return (
		<div className='tun-markdown'>
			{/* <MDXRemote {...props} components={{
				code: Code,
				a: ({...props}) => (
					<a target={'_blank'} rel='noreferrer' {...props}></a>
				),
			}}/> */}
			<Component components={MDXComponents as any}></Component>
		</div>
	);
};
