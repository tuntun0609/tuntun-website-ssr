import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';

export const MD_PATH = path.join(process.cwd(), 'src/md');

export const postFilePaths = fs
	.readdirSync(MD_PATH)
	.filter(path => /\.mdx?$/.test(path));

export const getMdData = async (mdPath: string) => {
	const filePath = path.join(MD_PATH, `${mdPath}.mdx`);
	console.log(filePath);
	const source = fs.readFileSync(filePath);

	const { content, data } = matter(source);

	const mdxSource = await serialize(content, {
		mdxOptions: {
			remarkPlugins: [],
			rehypePlugins: [],
		},
		scope: data,
	});

	return {
		source: mdxSource,
		frontMatter: data,
	};
};
