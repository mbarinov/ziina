import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {FaLinkedin, FaGithub, FaUser} from 'react-icons/fa';

import {Draggable} from './components/Draggable';
import useDragAndDrop from './hooks/useDragAndDrop';
import {drawInitialBackground, countRedPixels, drawImageFromSvg} from './utils/canvas';

import {ReactComponent as Cheese} from './assets/cheese.svg';
import {ReactComponent as Egg} from './assets/egg.svg';
import {ReactComponent as Drink} from './assets/drink.svg';

export default function App(): ReactElement {
    const [totalBackgroundPixels, setTotalBackgroundPixels] = useState<number>(0);
    const [totalVisiblePixels, setTotalVisiblePixels] = useState<number>(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const {handleDragStart, handleDragOver, handleDrop} = useDragAndDrop();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        drawInitialBackground(ctx);
        setTotalBackgroundPixels(500 * 500);

        const redPixels = countRedPixels(ctx);
        setTotalVisiblePixels(redPixels);
    }, []);

    async function onDrop(event: React.DragEvent<HTMLCanvasElement>) {
        const {draggableElement} = handleDrop(event);

        if (!canvasRef.current || !draggableElement) return;

        const svgElement = draggableElement.querySelector('svg');
        const ctx = canvasRef.current.getContext('2d');

        if (!ctx || !svgElement) return;

        await drawImageFromSvg(ctx, event, svgElement);
        const backgroundPixels = countRedPixels(ctx);
        setTotalVisiblePixels(backgroundPixels);
    }

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
            <header className="text-center py-5">
                <h1 className="text-3xl font-bold">Hey Ziina, Max is here ✌️</h1>
                <div className="flex justify-center mt-4 space-x-5">
                    <a href="https://www.linkedin.com/in/maxbarinov/" target="_blank" rel="noreferrer"><FaLinkedin
                        className="text-2xl"/></a>
                    <a href="https://github.com/mbarinov" target="_blank" rel="noreferrer"><FaGithub
                        className="text-2xl"/></a>
                    <a href="https://loado-cdn.fra1.cdn.digitaloceanspaces.com/max_barinov_software_engineer.pdf"
                       target="_blank" rel="noreferrer"><FaUser className="text-2xl"/></a>
                </div>
            </header>
            <main className="flex-1">
                <section className="flex flex-col md:flex-row p-5 justify-between">
                    <div className="flex flex-col items-center md:w-1/3 border shadow p-5 space-y-5">
                        <Draggable handleDragStart={handleDragStart}>
                            <svg height="100" width="100">
                                <rect width="100" height="100" style={{fill: "blue"}}/>
                            </svg>
                        </Draggable>
                        <Draggable handleDragStart={handleDragStart}>
                            <svg height="100" width="100">
                                <circle cx="50" cy="50" r="50" fill="blue"/>
                            </svg>
                        </Draggable>
                        <Draggable handleDragStart={handleDragStart}>
                            <Cheese/>
                        </Draggable>
                        <Draggable handleDragStart={handleDragStart}>
                            <Egg/>
                        </Draggable>
                        <Draggable handleDragStart={handleDragStart}>
                            <Drink/>
                        </Draggable>
                    </div>
                    <div className="md:w-2/3 border shadow mt-5 md:mt-0 p-5 md:ml-5">
                        <canvas
                            ref={canvasRef}
                            width={500}
                            height={500}
                            data-testid="canvas"
                            style={{border: '1px solid black', marginTop: '20px'}}
                            onDragOver={handleDragOver}
                            onDrop={onDrop}
                        ></canvas>
                        <h3 className="text-xl font-bold">Total Visible
                            Pixels: {new Intl.NumberFormat('en-US').format(totalVisiblePixels)}</h3>
                        <h3 className="text-xl font-bold">Total Background
                            Pixels: {new Intl.NumberFormat('en-US').format(totalBackgroundPixels)}</h3>
                        <h3 className="text-xl font-bold">Visible
                            percentage: {Math.floor(totalVisiblePixels / totalBackgroundPixels * 100).toFixed(0)}%</h3>
                    </div>
                </section>
                <section className="flex flex-col md:flex-row p-5 justify-between">
                    <div className="md:w-2/3 border shadow p-5">
                        <h2 className="text-2xl font-bold">Prompt</h2>
                        <p className="my-1 font-mono text-md p-2 bg-amber-100">
                            Create a webpage that loads on the left side a series of small blue boxes and on the
                            right side one large red box. A user should be able to click and drag the blue boxes one
                            at a time to a new location on the screen, including on top of the red box. The red box
                            does not move. Below the red box is a label that indicates the total area visible area of
                            the red box measure in pixels
                        </p>
                        <h2 className="text-2xl font-bold">Bonus Prompt</h2>
                        <p className="my-1 font-mono text-md p-2 bg-amber-100">The user can toggle between the shapes on
                            the left being boxes or circles.</p>
                        <h2 className="my-4 text-2xl font-bold">How to run</h2>
                        <div className="my-1">
                            <p className="text-md mb-2">The finest way to run this application is to use Github Codespaces. I've set up a devcontainer that will install all dependencies and run the application in your browser. Just open the <a className="underline" href="https://github.com/mbarinov/ziina" target="_blank" rel="noreferrer">repo</a> and click on the green button "Code"</p>
                            <p><span className="font-bold">npm install</span> - to install dependencies</p>
                            <p><span className="font-bold">npm run start</span> - to start the app in development mode
                            </p>
                            <p><span className="font-bold">npm run build</span> - to start the app in production mode
                            </p>
                            <p><span className="font-bold">npm run test</span> - to run tests</p>
                        </div>
                        <h2 className="my-4 text-2xl font-bold">Approach</h2>
                        <p className="my-1 text-md">
                            When the app starts, it first sets up a canvas with a default background and counts the
                            amount of red pixels, storing these values. The drag and drop feature is managed with a
                            custom React hook.</p>
                        <p className="mb-1 mt-2 text-md">
                            The magic happens when you drop them; it redraws the SVGs onto the canvas and updates the
                            count of red pixels using ImageData.
                        </p>
                        <h2 className="my-4 text-2xl font-bold">Limitations</h2>
                        <ul className={"list-disc list-inside"}>
                            <li>Draggable element should not have red pixels</li>
                            <li>Touch gestures are not supported</li>
                            <li>Window resizing is not supported</li>
                            <li>Draggable component is not fully accessible</li>
                        </ul>
                    </div>
                    <div className="border shadow mt-5 md:mt-0 p-5 md:w-1/3 md:ml-5">
                        <h2 className="text-2xl font-bold">Info</h2>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <div className="flex flex-row justify-items-center gap-2">
                                    <a href="https://github.com/mbarinov/ziina" target="_blank"
                                       rel="noreferrer">
                                        <FaGithub
                                            className="text-2xl"/></a>
                                    <a href="https://github.com/mbarinov/ziina" target="_blank"
                                       rel="noreferrer">Github repo</a>
                                </div>
                            </li>
                        </ul>
                        <h3 className="text-xl font-bold mt-4">Tech Stack</h3>
                        <ul className="mt-4 space-y-2 list-disc">
                            <li>
                                <span className={"text-lg"}>TypeScript</span>
                            </li>
                            <li>
                                <span className={"text-lg"}>React</span>
                            </li>
                            <li>
                                <span className={"text-lg"}>Tailwind</span>
                            </li>
                            <li>
                                <span className={"text-lg"}>React Testing Library</span>
                            </li>
                        </ul>
                        <h3 className="text-xl font-bold mt-4">Test Coverage</h3>
                        <p className={"text-lg"}>61.33%</p>
                    </div>
                </section>
            </main>
            <footer className="text-center py-5 mt-auto bg-gray-100 dark:bg-gray-800">
                <a href="https://maxbarinov.com" target="_blank" rel="noreferrer">
                    Made by Max in Georgia 🇬🇪
                </a>
            </footer>
        </div>
    );
}
