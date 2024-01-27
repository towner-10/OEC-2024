import type { MetaFunction } from '@remix-run/node';
import DrawingCanvas from "~/components/drawing-canvas";
import { ModeToggle } from "~/components/mode-toggle";

export const meta: MetaFunction = () => {
	return [{ title: 'PictureThis' }, { name: 'description', content: 'Placeholder' }];
};

export default function Index() {
	return (
		<>
			<header className="flex flex-row justify-between items-center">
				<h1>
					Picture <span className="font-light">This</span>
				</h1>
				<ModeToggle />
			</header>
			<main className='px-8'>
				<DrawingCanvas />
			</main>
		</>
	);
}
