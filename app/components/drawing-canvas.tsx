import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from 'react-sketch-canvas';
import { Button } from './ui/button';
import { LucideTrash } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { useStore } from '~/lib/game-state';

function LetterOutline({ letter, offset }: { letter: string; offset: { x: number; y: number } }) {
	return (
		<div
			style={{
				transform: `translate(${offset.x}px, ${offset.y}px)`
			}}
			className={`opacity-25 font-hand not-italic pointer-events-none cursor-none absolute text-[128px] dark:text-primary-foreground`}
		>
			{letter}
		</div>
	);
}

export default function DrawingCanvas() {
	const sketchRef = useRef<ReactSketchCanvasRef>(null);
	const { addPath, setPath, setStrokes, offset, letter, strokes } = useStore();

	const clearCanvas = useCallback(() => {
		sketchRef.current?.clearCanvas();
		sketchRef.current?.loadPaths([]);
		setPath(null);
		setStrokes(0);
	}, [setPath, setStrokes]);

	const onStroke = useCallback(
		(path: CanvasPath, isEraser: boolean) => {
			if (isEraser) {
				return;
			}

			setStrokes(strokes + 1);
			addPath(path);
		},
		[addPath, setStrokes, strokes]
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
			{letter && <LetterOutline letter={letter} offset={offset} />}
			<Button size="icon" className="absolute bottom-0 right-0 m-2" onClick={() => clearCanvas()}>
				<LucideTrash />
			</Button>
			<ReactSketchCanvas ref={sketchRef} onStroke={onStroke} strokeWidth={4} strokeColor="black" />
		</div>
	);
}
