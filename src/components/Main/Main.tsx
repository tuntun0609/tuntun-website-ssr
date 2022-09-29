import { ReactNode } from 'react';

type Props = {
  children?: ReactNode,
}

import style from './Main.module.scss';

export const Main = ({ children }: Props) => (
	<div className={style.container}>
		<div className={style.main}>
			{ children }
		</div>
	</div>
);
