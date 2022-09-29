import { GetStaticProps } from 'next';
import { getBlogList, BlogListItem } from '@/lib';
import { Main } from '@/components';

const BlogItem = ({ id, frontmatter }: BlogListItem) => (
	<div>
		{frontmatter.title ?? id}
		{frontmatter.desc ?? ''}
	</div>
);

const Blog = ({ blogList }: { blogList: BlogListItem[] }) => {
	console.log(blogList);
	return(
		<Main>
			{
				blogList.map(item => <BlogItem key={item.id} {...item}></BlogItem>)
			}
		</Main>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const blogList = await getBlogList();
	return {
		props: {
			blogList,
		},
	};
};

export default Blog;
