import { create } from 'zustand';

export const useStore = create<{
	currentScore: number;
	setScore: (score: number) => void;
}>((set) => ({
	currentScore: 0,
	setScore: (score: number) => set({ currentScore: score })
}));
