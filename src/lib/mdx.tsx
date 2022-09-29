import fs from 'fs';
import path from 'path';
import { bundleMDX } from 'mdx-bundler';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// md文件夹地址
export const MD_PATH = path.join(process.cwd(), 'src/md');
// md中blog文件夹地址
export const BLOG_PATH = path.join(process.cwd(), 'src/md/blog');

// 通过路径获取该路径下所有mdx文件的文件名
export const postFilePaths = (filePath: string) => fs
	.readdirSync(filePath)
	.filter(path => /\.mdx?$/.test(path))
	.map(item => item.replace('.mdx', ''));

// blog文件夹下所有mdx文件文件名
export const blogFilePath = postFilePaths(BLOG_PATH);

// 通过md名获取md数据
// 获取md文件夹下mdx文件: test.mdx or test
// 获取md文件夹下blog文件夹下mdx文件: blog/test.mdx or blog/test
export interface MdData {
	source: string,
	frontmatter: {
		[key: string]: any,
	}
}
export const getMdData = async (mdPath: string): Promise<MdData> => {
	const isExt = mdPath.endsWith('.mdx');
	const filePath = path.join(MD_PATH, isExt ? mdPath : `${mdPath}.mdx`);
	const source = fs.readFileSync(filePath, 'utf8');

	const { code, frontmatter } = await bundleMDX({
		source,
		mdxOptions(options, _frontmatter) {
			options.remarkPlugins = [
				...(options.remarkPlugins ?? []),
				remarkGfm,
			];
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				rehypeSlug,
				rehypePrism,
				rehypeAutolinkHeadings,
			];
			return options;
		},
	});
	return {
		source: code,
		frontmatter: frontmatter,
	};
};

// 获取blog文件夹下所有mdx文件的信息列表（不包括mdx内容）
export interface BlogListItem {
	id: string,
	frontmatter: {
		[key: string]: string
	}
}
export const getBlogList = async (): Promise<BlogListItem[]> => await Promise.all(
	postFilePaths(BLOG_PATH).map(async (item) => {
		const { frontmatter } = await getMdData(`blog/${item}`);
		return {
			id: item,
			frontmatter,
		};
	})
);
