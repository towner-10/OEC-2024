import type { MetaFunction } from '@remix-run/node';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import DrawingCanvas from '~/components/drawing-canvas';

import { ModeToggle } from '~/components/mode-toggle';
import { useStore } from '~/lib/game-state';
import { useEffect, useState } from 'react';
import logo from '../assets/ln_logo.svg';
import { letterPaths } from '~/lib/letter-paths';
import { pathDist } from '~/lib/utils';

export const meta: MetaFunction = () => {
	return [{ title: 'PictureThis' }, { name: 'description', content: 'Placeholder' }];
};

export default function Index() {

	const { path, offset, setOffset} = useStore();

	useEffect(() => {
		console.log(path?.paths)
		console.log(letterPaths.z)

		if(path != null) console.log(pathDist(path.paths, letterPaths.z, offset))
	});

	const [score, setScore] = useState<number>(0);
	const [spd, setSpeed] = useState<number>(10);
	const [acc, setAccuracy] = useState<number>(50);
	const [hScore, setHighScore] = useState<number>(20000);
	const [acceptedLetters, setAcceptedLetters] = useState<string>('');


	return (
		<>
			<header className="flex flex-row justify-end pt-5 pr-10 pb-5">
				<ModeToggle />
			</header>
			<main className='grid h-screen grid-cols-4 p-10 pt-0 pr-10'>
				<div className='col-span-1 flex flex-col ml-20'>
					<img src={logo} className='w-48 h-22'></img>
					<div className='flex flex-col pt-12 gap-0'>
						<h2> {score} </h2>
						<h3> MATCH SCORE </h3>
					</div>
					<div className='mt-2'>
						<div className='grid grid-cols-2 px-0 py-0 gapx-5 gapy-0'>
							<h4> SPEED </h4>
							<h5> {spd} letters/min</h5>
						</div>
						<div className='grid grid-cols-2 px-0 py-0 gapx-5 gapy-0'>
							<h4> ACCURACY </h4>
							<h5> {acc}% </h5>
						</div>
					</div>

					<div className='flex flex-col pt-12 gap-0'>
						<h2> {hScore} </h2>
						<h3> HIGH SCORE </h3>
					</div>

					

					<div className='flex flex-col pt-10 gap-2'>
						<Input onChange={(e) => setAcceptedLetters(e.target.value)}></Input>
						<h3>FOCUS LETTERS</h3>
					</div>

					<Button className='text-white font-bold mt-12'>START MATCH</Button>
				</div>
				<div className='col-span-3 ml-20'>
					<DrawingCanvas />
				</div>
			</main>
		</>
	);
}
