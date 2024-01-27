import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from 'react-sketch-canvas';
import { Button } from './ui/button';
import { LucideTrash } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import { useStore } from '~/lib/game-state';
import { letterPaths } from '~/lib/letter-paths';

export default function DrawingCanvas() {
	const sketchRef = useRef<ReactSketchCanvasRef>(null);
	const { addPath, setPath, offset } = useStore();

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

	/**
	useEffect(() => {
		const canvasPath: CanvasPath[] = [{
			drawMode: true,
			paths: letterPaths.k,
			strokeColor: 'black',
			strokeWidth: 4
		}];
		sketchRef.current?.loadPaths(canvasPath);
	}, []);
	*/

	return (
		<div className="w-full h-[600px] relative">
			<div className={`opacity-25 font-hand not-italic pointer-events-none cursor-none absolute text-[128px] top-[${offset.y}px] left-[${offset.x}] dark:text-primary-foreground`}>
				k
			</div>
			<Button size="icon" className="absolute bottom-0 right-0 m-2" onClick={() => clearCanvas()}>
				<LucideTrash />
			</Button>
			<ReactSketchCanvas ref={sketchRef} onStroke={onStroke} strokeWidth={4} strokeColor="black" />
		</div>
	);
}
