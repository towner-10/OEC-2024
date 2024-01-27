import type { MetaFunction } from '@remix-run/node';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import DrawingCanvas from '~/components/drawing-canvas';

import { ModeToggle } from '~/components/mode-toggle';
import { useStore } from '~/lib/game-state';
import { useEffect, useState } from 'react';

export const meta: MetaFunction = () => {
	return [{ title: 'PictureThis' }, { name: 'description', content: 'Placeholder' }];
};

export default function Index() {
	const { path } = useStore();

	useEffect(() => {
		console.log(path);
	}, [path]);

	const [score, setScore] = useState<number>(0);
	const [spd, setSpeed] = useState<number>(10);
	const [acc, setAccuracy] = useState<number>(50);
	const [hScore, setHighScore] = useState<number>(20000);
	const [acceptedLetters, setAcceptedLetters] = useState<string>('');

	return (
		<>
			<header className="flex flex-row justify-between items-center">
				<h1>Letter Ninja</h1>
				<ModeToggle />
			</header>
			<main className="grid grid-cols-3 p-10">
				<div className="col-span-1 flex flex-col gap-10">
					<div className="flex flex-col gap-2">
						<h2>{score}</h2>
						<h3>MATCH SCORE</h3>
					</div>
					<div className="flex flex-col gap-2">
						<h2>{hScore}</h2>
						<h3>HIGH SCORE</h3>
					</div>

					<div>
						<div className="grid grid-cols-2 px-20 py-0 gapx-10 gapy-0">
							<h4>SPEED</h4>
							<h5>{spd} letters/min</h5>
						</div>
						<div className="grid grid-cols-2 px-20 py-0 gapx-10 gapy-0">
							<h4> ACCURACY </h4>
							<h5> {acc}% </h5>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<Input onChange={(e) => setAcceptedLetters(e.target.value)}></Input>
						<h3>FOCUS LETTERS</h3>
					</div>

					<Button>START MATCH</Button>
				</div>
				<div className="col-span-2 pl-10">
					<DrawingCanvas />
				</div>
			</main>
		</>
	);
}
