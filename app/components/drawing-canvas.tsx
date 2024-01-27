import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from 'react-sketch-canvas';
import { Button } from './ui/button';
import { LucideTrash } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { useStore } from '~/lib/game-state';

export default function DrawingCanvas() {
	const ref = useRef<ReactSketchCanvasRef>(null);
	const { addPath, setPath } = useStore();

	const clearCanvas = useCallback(() => {
		ref.current?.clearCanvas();
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
		<div className="w-full h-5/6 relative">
			<Button size="icon" className="absolute top-0 left-0 m-2" onClick={() => clearCanvas()}>
				<LucideTrash />
			</Button>
			<ReactSketchCanvas ref={ref} onStroke={onStroke} strokeWidth={4} strokeColor="black" />
		</div>
	);
}
