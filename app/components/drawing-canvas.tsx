import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from 'react-sketch-canvas';
import { Button } from './ui/button';
import { LucideTrash } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { useStore } from '~/lib/game-state';

export default function DrawingCanvas() {
	const sketchRef = useRef<ReactSketchCanvasRef>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const { addPath, setPath } = useStore();

	useEffect(() => {
		const ctx = canvasRef.current?.getContext('2d');

		if (!ctx) {
			return;
		}

		ctx.font = '254px Patrick Hand';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'black';
		ctx.fillText('a', 5, 5);
	}, [canvasRef]);

	const clearCanvas = useCallback(() => {
		sketchRef.current?.clearCanvas();
		sketchRef.current?.loadPaths([]);
		setPath(null);
	}, [setPath]);

	const onStroke = useCallback(
		(path: CanvasPath, isEraser: boolean) => {
			if (isEraser) {
				return;
			}

			addPath(path);
		},
		[addPath]
	);

	return (
		<div className="w-full h-[600px] relative">
			<canvas className='absolute w-full h-[600px] pointer-events-none' ref={canvasRef} />
			<Button size="icon" className="absolute bottom-0 right-0 m-2" onClick={() => clearCanvas()}>
				<LucideTrash />
			</Button>
			<ReactSketchCanvas ref={sketchRef} onStroke={onStroke} strokeWidth={4} strokeColor="black" />
		</div>
	);
}
