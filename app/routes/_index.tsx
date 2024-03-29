import type { MetaFunction } from '@remix-run/node';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import DrawingCanvas from '~/components/drawing-canvas';

import { ModeToggle } from '~/components/mode-toggle';
import { useStore } from '~/lib/game-state';
import { useCallback, useEffect, useState } from 'react';
import logo from '~/assets/ln_logo.svg';
import { Letters, letterPaths, letterStrokes } from '~/lib/letter-paths';
import { pathDist, sigmoid } from '~/lib/utils';

export const meta: MetaFunction = () => {
	return [{ title: 'LetterNinja' }, { name: 'description', content: 'Placeholder' }];
};

const generateRandomLetter = (acceptedLetters?: string[]) => {
	if (acceptedLetters) {
		return acceptedLetters[Math.floor(Math.random() * acceptedLetters.length)] as Letters;
	}

	const letters = 'abcdefghijklmnopqrstuvwxyz';
	return letters[Math.floor(Math.random() * letters.length)] as Letters;
};

const generateRandomInRange = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

export default function Index() {
	const {
		currentScore,
		path,
		offset,
		letter,
		strokes,
		accuracy,
		currentTotalLetters,
		addScore,
		setAccuracy,
		resetScore,
		setLetter,
		setOffset
	} = useStore();

	const [hScore, setHighScore] = useState<number>(0);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [acceptedLetters, setAcceptedLetters] = useState<string>('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const highScore = localStorage.getItem('highScore');
			if (highScore) {
				setHighScore(parseFloat(highScore));
			}
		}
	}, []);

	const newLetter = useCallback(() => {
		setLetter(
			generateRandomLetter(acceptedLetters !== '' ? acceptedLetters.split(',') : undefined)
		);
		setOffset({
			x: generateRandomInRange(0, 300),
			y: generateRandomInRange(0, 400)
		});
	}, [setLetter, setOffset, acceptedLetters]);

	useEffect(() => {
		const average = Math.floor(currentScore / currentTotalLetters);
		const accuracy = sigmoid(average - 100, 20);

		// Check if NaN
		if (accuracy !== accuracy) {
			setAccuracy(0);
			return;
		}

		setAccuracy(accuracy);
	}, [currentScore, currentTotalLetters, setAccuracy]);

	useEffect(() => {
		if (!path || !letter || strokes < letterStrokes[letter] + 1) return;
		const letterScore = pathDist(letterPaths[letter], path.paths, offset);
		addScore(letterScore);
		newLetter();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [strokes, addScore, newLetter]);

	useEffect(() => {
		if (gameOver) {
			if (currentScore > hScore) {
				console.log('New high score!');
				setHighScore(currentScore);
				localStorage.setItem('highScore', currentScore.toString());
			}

			setLetter(null);
			setOffset({ x: 0, y: 0 });
		}
		return () => setGameOver(false);
	}, [currentScore, gameOver, hScore, resetScore, setLetter, setOffset]);

	return (
		<main>
			<header className="flex flex-row justify-end pt-5 pr-10 pb-5">
				<ModeToggle />
			</header>
			<section className="grid grid-cols-4 p-10 pt-0 pr-10">
				<div className="col-span-1 flex flex-col ml-20">
					<img src={logo} alt="Logo" className="w-48 h-22"></img>
					<div className="flex flex-col pt-12 gap-0">
						<h2>{Math.floor(currentScore)}</h2>
						<h3>MATCH SCORE</h3>
					</div>
					<div className="mt-2">
						<div className="grid grid-cols-2 px-0 py-0 gapx-5 gapy-0">
							<h4>ACCURACY</h4>
							<h5>{accuracy ? `${(accuracy * 100).toFixed(2)}%` : 'N/A'}</h5>
						</div>
						<div className="grid grid-cols-2 px-0 py-0 gapx-5 gapy-0">
							<h4>AVERAGE</h4>
							<h5>{Math.floor(currentScore / currentTotalLetters) || 'N/A'}</h5>
						</div>
					</div>
					<div className="flex flex-col pt-12 gap-0">
						<h2>{Math.floor(hScore)}</h2>
						<h3>HIGH SCORE</h3>
					</div>
					<div className="flex flex-col pt-10 gap-2">
						<Input onChange={(e) => setAcceptedLetters(e.target.value)}></Input>
						<h3>FOCUS LETTERS</h3>
					</div>
					<Button
						className="text-white font-bold mt-12"
						onClick={() => {
							resetScore();
							newLetter();

							setTimeout(() => {
								!gameOver && setGameOver(true);
							}, 60000);
						}}
					>
						START MATCH
					</Button>
				</div>
				<div className="col-span-3 ml-20">
					<DrawingCanvas />
				</div>
			</section>
		</main>
	);
}
