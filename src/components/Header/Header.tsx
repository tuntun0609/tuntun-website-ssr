import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import style from './Header.module.scss';
import logo from '@public/tuntun.jpg';

export interface HeaderProps {
	name: string,
	icon?: ReactNode,
	aProps?: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
}

export const Header = ({ items }: { items: HeaderProps[] }) => {
	const router = useRouter();
	return (
		<div className={style.header}>
			<div className={style.logo} onClick={() => {
				router.push('/');
			}}>
				<Image width={50} height={50} className={style.img} src={logo} alt="tuntun-logo" />
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
		</div>
	);
};
