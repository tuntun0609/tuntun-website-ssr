import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Header, HeaderProps } from '@/components/Header/Header';
import { GithubOutlined, YoutubeOutlined, YuqueOutlined } from '@ant-design/icons';

type Props = {
  children?: ReactNode,
}

export const Layout = ({ children }: Props) => {
	const router = useRouter();
	const HeaderItems: HeaderProps[] = [
		{
			name: 'Home',
			aProps: {
				onClick: (e) => {
					e.preventDefault();
					router.push('/');
				},
			},
		},
		{
			name: 'Project',
			aProps: {
				onClick: (e) => {
					e.preventDefault();
					router.push('/project');
				},
			},
		},
		{
			name: 'Blog',
			aProps: {
				onClick: (e) => {
					e.preventDefault();
					router.push('/blog');
				},
			},
		},
		{
			name: 'Yuque',
			icon: <YuqueOutlined />,
			aProps: {
				href: 'https://www.yuque.com/webknowledge',
				target: '_blank',
			},
		},
		{
			name: 'GitHub',
			icon: <GithubOutlined />,
			aProps: {
				href: 'https://github.com/tuntun0609',
				target: '_blank',
			},
		},
		{
			name: 'Bilibili',
			icon: <YoutubeOutlined />,
			aProps: {
				href: 'https://space.bilibili.com/47706697',
				target: '_blank',
			},
		},
	];
	return (
		<>
			<Header items={HeaderItems}></Header>
			{ children }
		</>
	);
};
