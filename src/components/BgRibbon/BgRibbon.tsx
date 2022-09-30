import { useEffect, useRef, useState } from 'react';

const { random } = Math;

interface RibbonType {
	ribbonWidth?: number,
	globalAlpha?: number,
	zIndex?: number,
	canClickChange?: boolean,
	clickChangeDom?: HTMLElement | Document | null,
	drawSite?: [number, number],
}

export const BgRibbon = ({
	globalAlpha = 0.5,
	ribbonWidth = 100,
	zIndex = -1,
	drawSite = [0, 0],
}: RibbonType) => {
	const el = useRef<HTMLCanvasElement | null>(null);
	let drawSiteClone = drawSite;
	const r = useRef(0);
	const path = useRef([{
		x: 0,
		y: drawSiteClone[0],
	}, {
		x: 0,
		y: drawSiteClone[1],
	}]);

	const geneStyle = () => {
		const {cos} = Math;
		const bgStyle = ['', '', ''];
		bgStyle[0] = Math.floor(cos(r.current) * 127 + 128).toString(16);
		bgStyle[1] = Math.floor(cos(r.current + Math.PI * 2 / 3) * 127 + 128).toString(16);
		bgStyle[2] = Math.floor(cos(r.current + Math.PI * 2 / 3 * 2) * 127 + 128).toString(16);
		bgStyle[0] = bgStyle[0].length === 1 ? '0' + bgStyle[0] : bgStyle[0];
		bgStyle[1] = bgStyle[1].length === 1 ? '0' + bgStyle[1] : bgStyle[1];
		bgStyle[2] = bgStyle[2].length === 1 ? '0' + bgStyle[2] : bgStyle[2];
		return '#'.concat(bgStyle.join(''));
	};

	const draw = useRef<(start: any, end: any) => void>();
	const init = useRef<() => void>();
	const geneY = useRef<(y: number) => number>();

	const initCanvas = (
		canvas: HTMLCanvasElement,
		_dpi?: number,
	) => {
		const ctx = canvas.getContext('2d')!;
		const dpr = window.devicePixelRatio || 1;
		canvas.width = canvas.offsetWidth * dpr;
		canvas.height = canvas.offsetHeight * dpr;
		ctx.scale(dpr, dpr);
		return { ctx };
	};

	useEffect(() => {
		const fn = async () => {
			const canvasRibbon = el.current!;
			const { ctx } = initCanvas(canvasRibbon);
			// eslint-disable-next-line react-hooks/exhaustive-deps
			drawSiteClone = [
				canvasRibbon?.offsetHeight * 0.5 + ribbonWidth,
				canvasRibbon?.offsetHeight * 0.5 - ribbonWidth,
			];
			ctx.globalAlpha = globalAlpha;
			geneY.current = (y: number): number => {
				const temp = y + (Math.random() * 2 - 1.1) * ribbonWidth;
				return temp > canvasRibbon?.offsetHeight || temp < 0 ? geneY.current!(y) : temp;
			};
			draw.current = (start, end) => {
				ctx.beginPath(); // 开始路径
      	ctx.moveTo(start.x, start.y);
				ctx.lineTo(end.x, end.y); // 绘制第二点
				const nextX = end.x + (random() * 2 - 0.25) * ribbonWidth; // 随机生成第三点的x坐标
				const nextY = geneY.current!(end.y); // 随机生成第三点的y坐标
				ctx.lineTo(nextX, nextY); // 绘制第三点
				ctx.closePath(); // 闭合本次路径
				ctx.fillStyle = geneStyle(); // 得到随机绘制颜色
				ctx.fill();
				r.current -= Math.PI * 2 / -50;
				// eslint-disable-next-line prefer-destructuring
				path.current[0] = path.current[1];
				path.current[1] = {
					x: nextX,
					y: nextY,
				};
			};
			init.current = () => {
				ctx.clearRect(0, 0, canvasRibbon?.offsetWidth, canvasRibbon?.offsetHeight);
				path.current = [{
					x: 0,
					y: drawSiteClone[0],
				}, {
					x: 0,
					y: drawSiteClone[1],
				}];
				while (path.current[1].x < canvasRibbon?.offsetWidth + ribbonWidth) {
					draw.current!(path.current[0], path.current[1]);
				}
			};
			init.current();
			document.addEventListener('click', init.current);
			return () => {
				document.removeEventListener('click', init.current!);
			};
		};
		fn();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div style={{
			width: '100vw',
			height: 'calc(100vh - 60px)',
			zIndex: zIndex,
			position: 'fixed',
			top: '60px',
			left: 0,
		}}>
			<canvas
				ref={el}
				style={{
					width: '100%',
					height: '100%',
					position: 'relative',
				}}
			/>
		</div>
	);
};
