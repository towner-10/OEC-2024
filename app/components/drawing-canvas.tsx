import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { Button } from './ui/button';
import { LucideTrash } from 'lucide-react';
import { useCallback, useRef } from 'react';

export default function DrawingCanvas() {
	const ref = useRef<ReactSketchCanvasRef>(null);

	const clearCanvas = useCallback(() => {
		ref.current?.clearCanvas();
	}, []);

	return (
		<div className="w-full h-[600px] relative">
			<Button size="icon" className="absolute top-0 left-0 m-2" onClick={() => clearCanvas()}>
				<LucideTrash />
			</Button>
			<ReactSketchCanvas
				ref={ref}
				style={{
					border: '0.0625rem solid #9c9c9c',
					borderRadius: '0.25rem'
				}}
				strokeWidth={4}
				strokeColor="black"
			/>
		</div>
	);
}
