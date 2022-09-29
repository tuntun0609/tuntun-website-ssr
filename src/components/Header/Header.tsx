import { ReactNode, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Drawer } from 'antd';

import style from './Header.module.scss';
import logo from '@public/tuntun.jpg';
import { MenuOutlined } from '@ant-design/icons';

export interface HeaderProps {
	name: string,
	icon?: ReactNode,
	aProps?: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
}

export const Header = ({ items }: { items: HeaderProps[] }) => {
	const router = useRouter();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const onClose = () => {
		setDrawerOpen(false);
	};
	return (
		<div className={style.header}>
			<div className={style.logo} onClick={() => {
				router.push('/');
			}}>
				<Image width={40} height={40} className={style.img} src={logo} alt="tuntun-logo" />
				<div className={style.title}>Tun Website</div>
			</div>
			<div className={style.content}>
				{
					items.map(item => (
						<a key={item.name} rel='noreferrer' className={style.item} {...item.aProps}>
							<div className={style.text}>{item.name}</div>
							{ item.icon ?
								<div className={style.icon} >
									{ item.icon }
								</div> : null }
						</a>
					))
				}
			</div>
			<MenuOutlined onClick={() => setDrawerOpen(true)} className={style.menuicon} />
			<Drawer
				width={'300px'}
				placement="right"
				onClose={onClose}
				open={drawerOpen}
				className={style.drawerContent}
				title={'Tun Website'}
			>
				{
					items.map(item => (
						<a key={item.name} rel='noreferrer' className={style.item} {...item.aProps}>
							<div className={style.text}>{item.name}</div>
							{ item.icon ?
								<div className={style.icon} >
									{ item.icon }
								</div> : null }
						</a>
					))
				}
			</Drawer>
		</div>
	);
};
