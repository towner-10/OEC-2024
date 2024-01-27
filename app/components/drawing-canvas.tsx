import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from 'react-sketch-canvas';
import { Button } from './ui/button';
import { LucideTrash } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { useStore } from '~/lib/game-state';

export default function DrawingCanvas() {
	const sketchRef = useRef<ReactSketchCanvasRef>(null);
	const { addPath, setPath } = useStore();

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
			<div className="opacity-25 font-hand not-italic pointer-events-none cursor-none absolute text-[128px] dark:text-primary-foreground">
				z
			</div>
			<Button size="icon" className="absolute bottom-0 right-0 m-2" onClick={() => clearCanvas()}>
				<LucideTrash />
			</Button>
			<ReactSketchCanvas ref={sketchRef} onStroke={onStroke} strokeWidth={4} strokeColor="black" />
		</div>
	);
}
