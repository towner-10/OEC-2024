import { create } from 'zustand';
import { CanvasPath } from 'react-sketch-canvas';
import { Point } from './utils';
import { Letters } from './letter-paths';

export const useStore = create<{
	currentScore: number;
	resetScore: () => void;
	addScore: (score: number) => void;
	currentTotalLetters: number;
	path: CanvasPath | null;
	setPath: (path: CanvasPath | null) => void;
	addPath: (path: CanvasPath) => void;
	letter: Letters | null;
	setLetter: (letter: Letters | null) => void;
	offset: Point;
	setOffset: (point: Point) => void;
	strokes: number;
	setStrokes: (strokes: number) => void;
	totalTime: number;
	setTotalTime: (time: number) => void;
	letterTimer: number | null;
	setLetterTimer: (time: number | null) => void;
}>((set) => ({
	currentScore: 0,
	resetScore: () => set({ currentScore: 0, currentTotalLetters: 0 }),
	addScore: (score: number) =>
		set((state) => ({
			currentScore: state.currentScore + score,
			currentTotalLetters: state.currentTotalLetters + 1
		})),
	currentTotalLetters: 0,
	path: null,
	setPath: (path: CanvasPath | null) => set({ path }),
	addPath: (path: CanvasPath) =>
		set((state) => {
			if (state.path) {
				return {
					...state,
					path: {
						...state.path,
						paths: [...state.path.paths, ...path.paths]
					}
				};
			}

			return {
				...state,
				path
			};
		}),
	letter: null,
	setLetter: (letter: Letters | null) => set({ letter }),
	offset: { x: 0, y: 0 },
	setOffset: (point: Point) => set({ offset: point }),
	strokes: 0,
	setStrokes: (strokes: number) => set({ strokes }),
	totalTime: 0,
	setTotalTime: (time: number) => set({ totalTime: time }),
	letterTimer: null,
	setLetterTimer: (time: number | null) => set({ letterTimer: time })
}));
