import { create } from 'zustand';
import { CanvasPath } from 'react-sketch-canvas';

export const useStore = create<{
	currentScore: number;
	setScore: (score: number) => void;
	path: CanvasPath | null;
	setPath: (path: CanvasPath | null) => void;
	addPath: (path: CanvasPath) => void;
}>((set) => ({
	currentScore: 0,
	setScore: (score: number) => set({ currentScore: score }),
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
		})
}));
