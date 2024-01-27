import type { MetaFunction } from '@remix-run/node';
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import DrawingCanvas from "~/components/drawing-canvas";

import { ModeToggle } from "~/components/mode-toggle";


export const meta: MetaFunction = () => {
	return [{ title: 'PictureThis' }, { name: 'description', content: 'Placeholder' }];
};

export default function Index() {
	return (
		<>
			<header className="flex flex-row justify-between items-center">
				<>
					<h1>
						Letter
					</h1>
					<h1>
						Ninja
					</h1>	
				</>
				<ModeToggle />
			</header>
			<main className='px-8'>
				<Input placeholder="enter accepted letters"></Input>
				<DrawingCanvas />
				<Button>Start the Game</Button>
			</main>
		</>
	);
}
