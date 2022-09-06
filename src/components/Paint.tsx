import React, {
	Dispatch,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

interface Coordinate {
	x: number;
	y: number;
}
type PaintType = {
	handler: Dispatch<any>;
	imgdata: any[];
	openFlag: boolean;
	openFlagHandler: Dispatch<any>;
	setimageURL: any;
};

const Paint = ({
	handler,
	imgdata,
	openFlag,
	openFlagHandler,
	setimageURL,
}: PaintType) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [windowSize, setwindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	const [color, setColor] = useState("black");
	const [width, setWidth] = useState(2);

	const [mousePosition, setMousePosition] =
		useState<Coordinate | undefined>(undefined);
	const [isPainting, setIsPainting] = useState(false);

	const [flag, setFlag] = useState(false);

	const getPosition = (event: MouseEvent): Coordinate | undefined => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;

		return {
			x: event.pageX - canvas.offsetLeft,
			y: event.pageY - canvas.offsetTop,
		};
	};

	const startPaint = useCallback((event: MouseEvent) => {
		const coordinates = getPosition(event);
		if (coordinates) {
			setIsPainting(true);
			setMousePosition(coordinates);
		}
	}, []);

	const drawLine = (
		originalMousePosition: Coordinate,
		newMousePosition: Coordinate
	) => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		const context = canvas.getContext("2d");

		if (context) {
			context.strokeStyle = color;
			context.lineJoin = "round";
			context.lineWidth = width;

			context.beginPath();

			context.moveTo(originalMousePosition.x, originalMousePosition.y);
			context.lineTo(newMousePosition.x, newMousePosition.y);
			context.closePath();

			context.stroke();
		}
	};
	const paint = useCallback(
		(event: MouseEvent) => {
			event.preventDefault();
			event.stopPropagation();

			if (isPainting) {
				const newMousePosition = getPosition(event);
				if (mousePosition && newMousePosition) {
					drawLine(mousePosition, newMousePosition);
					setMousePosition(newMousePosition);
				}
			}
		},
		[isPainting, mousePosition]
	);
	const exitPaint = useCallback(() => {
		setIsPainting(false);
	}, []);
	const startTouch = useCallback((event: TouchEvent) => {
		event.preventDefault();

		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;

		var touch = event.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY,
		});
		canvas.dispatchEvent(mouseEvent);
	}, []);

	const exitTouch = useCallback((event: TouchEvent) => {
		event.preventDefault();

		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, []);
	const touch = useCallback((event: TouchEvent) => {
		event.preventDefault();
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		var touch = event.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY,
		});
		canvas.dispatchEvent(mouseEvent);
	}, []);

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		if (isPainting) {
			setFlag(true);
		} else if (!isPainting && flag) {
			setFlag(false);

			const canvas: HTMLCanvasElement = canvasRef.current;
			const context = canvas.getContext("2d");
			const readImag: any = context?.getImageData(
				0,
				0,
				windowSize.width,
				windowSize.height
			);

			if (readImag) {
				imgdata.push(readImag);

				handler(imgdata);

				let imgDataUrl = canvas.toDataURL("image/png");
				setimageURL(imgDataUrl);
			}
		}
	}, [flag, isPainting]);
	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		const context = canvas.getContext("2d");

		if (openFlag) {
			imgdata.map((data) => {
				context?.putImageData(data, 0, 0);
			});
			openFlagHandler(false);
		}
	});

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;

		canvas.addEventListener("mousedown", startPaint);
		canvas.addEventListener("mousemove", paint);
		canvas.addEventListener("mouseup", exitPaint);
		canvas.addEventListener("mouseleave", exitPaint);

		canvas.addEventListener("touchstart", startTouch);
		canvas.addEventListener("touchmove", touch);
		canvas.addEventListener("touchend", exitTouch);

		return () => {
			canvas.removeEventListener("mousedown", startPaint);
			canvas.removeEventListener("mousemove", paint);
			canvas.removeEventListener("mouseup", exitPaint);
			canvas.removeEventListener("mouseleave", exitPaint);

			canvas.removeEventListener("touchstart", startTouch);
			canvas.removeEventListener("touchmove", touch);
			canvas.removeEventListener("touchend", exitTouch);
		};
	}, [startPaint, paint, exitPaint]);

	const onUndo = () => {
		imgdata.pop();

		if (!canvasRef.current) {
			return;
		}
		const canvas: HTMLCanvasElement = canvasRef.current;
		const context = canvas.getContext("2d");

		if (imgdata.length) {
			context?.putImageData(imgdata[imgdata.length - 1], 0, 0);
		} else {
			context?.clearRect(0, 0, windowSize.width - 100, windowSize.height - 200);
		}

		handler(imgdata);
		let imgDataUrl = canvas.toDataURL("image/png");
		setimageURL(imgDataUrl);
	};

	const btnHandler = (
		e: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>
	) => {
		const idCheck = (e.target as HTMLButtonElement).id;
		const valCheck = (e.target as HTMLInputElement).value;
		if (["blue", "green", "white", "black"].includes(idCheck))
			setColor(idCheck);
		else if (idCheck === "width") {
			setWidth(+valCheck);
		}
	};

	return (
		<div className="absolute w-full h-full  flex items-center justify-center">
			<div className="absolute z-10 top-36 flex ">
				<div className="flex flex-col sm:flex-row">
					<div className="space-x-2 flex justify-center">
						<button
							className=" rounded-full w-5 h-5 bg-blue-500"
							id="blue"
							onClick={btnHandler}
						></button>

						<button
							className=" rounded-full w-5 h-5 bg-green-300"
							id="green"
							onClick={btnHandler}
						></button>
						<button
							className=" rounded-full w-5 h-5 bg-white outline"
							id="white"
							onClick={btnHandler}
						></button>

						<button
							className=" rounded-full w-5 h-5 bg-black "
							id="black"
							onClick={btnHandler}
						></button>
					</div>

					<input
						onChange={btnHandler}
						type="range"
						id="width"
						min="1"
						max="101"
						step="5"
						className="mx-4 mt-4 sm:mt-0"
					/>
				</div>
				<div className=" ml-auto" onClick={onUndo}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="cursor-pointer h-5 w-5 mx-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>
			<canvas
				ref={canvasRef}
				width={350}
				height={350}
				className="fixed top-32 bg-white border "
			></canvas>
		</div>
	);
};

export default Paint;
