import * as path from "path";
import {
	createCanvas,
	registerFont,
	Canvas,
	CanvasRenderingContext2D,
	loadImage,
	Image,
} from "canvas";
import { MixedTextInput } from "../templates/ticketTemplate";

// FONTS
registerFont(
	path.join(__dirname, "../", "../", "fonts", "Viga", "Viga-Regular.ttf"),
	{
		family: "Viga",
	}
);

registerFont(
	path.join(
		__dirname,
		"../",
		"../",
		"fonts",
		"Montserrat",
		"Montserrat-Regular.ttf"
	),
	{
		family: "Montserrat",
	}
);

registerFont(
	path.join(__dirname, "../", "../", "fonts", "Rubik", "Rubik-Regular.ttf"),
	{
		family: "Rubik Regular",
	}
);

registerFont(
	path.join(__dirname, "../", "../", "fonts", "Rubik", "Rubik-Bold.ttf"),
	{
		family: "Rubik Bold",
	}
);

registerFont(
	path.join(__dirname, "../", "../", "fonts", "Rubik", "Rubik-SemiBold.ttf"),
	{
		family: "Rubik SemiBold",
	}
);

// TYPES
interface Coords {
	x: number;
	y: number;
}

export interface ImageBuilderContext {
	ib: ImageBuilder;
	ctx: CanvasRenderingContext2D;
}

export default class ImageBuilder {
	private context: CanvasRenderingContext2D;
	private canvas: Canvas;
	private finished: boolean;
	private static logoImg?: Image;
	private static iconImg?: Image;

	private constructor(private width: number, private height: number) {
		this.canvas = createCanvas(width, height);
		this.context = this.canvas.getContext("2d");
		this.reset();
		this.finished = false;
	}

	static async init(width: number, height: number) {
		if (!ImageBuilder.logoImg) {
			ImageBuilder.logoImg = await loadImage(
				path.join(__dirname, "../", "assets", "logo.png")
			);
		}

		if (!ImageBuilder.iconImg) {
			ImageBuilder.iconImg = await loadImage(
				path.join(__dirname, "../", "assets", "bean.png")
			);
		}

		return new ImageBuilder(width, height);
	}

	circleIcon(radius: number, { x, y }: Coords) {
		this.fillStyle("#fff");
		this.context.beginPath();
		this.context.ellipse(x, y, radius, radius, 0, 0, 360);
		this.context.fill();
		this.context.drawImage(
			ImageBuilder.iconImg,
			x - radius * 0.65,
			y - radius * 0.75,
			radius * 1.25,
			radius * 1.5
		);
		return this.reset();
	}

	background(color: string) {
		this.fillStyle(color);
		const ctx = this.context;
		ctx.moveTo(0, 0);
		ctx.lineTo(1201, 0);
		ctx.lineTo(1201, 628);
		ctx.lineTo(0, 628);
		ctx.closePath();
		return this.reset();
	}

	raw(callback: (args: ImageBuilderContext) => void) {
		callback({ ib: this, ctx: this.context });
		return this.reset();
	}

	header(text: string, { x, y }: Coords) {
		this.fillStyle("#fff");
		this.strokeStyle("#fff");
		this.font("90px Viga");
		this.context.fillText(text, x, y);
		return this.reset();
	}

	paragraph(text: string, { x, y }: Coords) {
		this.fillStyle("#fff");
		this.strokeStyle("#fff");
		this.font("60px Montserrat");
		this.context.fillText(text, x, y);
		return this.reset();
	}

	logo({ x, y }: Coords) {
		this.context.drawImage(ImageBuilder.logoImg, x, y, 410, 115);
		return this.reset();
	}

	build() {
		if (this.finished) {
			throw new Error(
				"ImageBuilder.build() can only be called once. You must construct a new ImageBuilder for each image you are building."
			);
		}
		this.finished = true;
		return this.canvas.toBuffer("image/png");
	}

	wrapText(
		context: CanvasRenderingContext2D,
		text: string,
		maxWidth: number,
		lineHeight: number,
		{ x, y }: Coords
	) {
		let words = text.split(" "),
			line = "",
			testWord: string,
			testMetrics: TextMetrics;

		this.font("40px Viga");

		//iterate over the words
		for (let i = 0; i < words.length; i++) {
			testWord = words[i];
			//get metrics related to how wide the testWord is
			testMetrics = context.measureText(testWord);
			if (testMetrics.width > maxWidth) {
				// Determine how much of the word will fit
				testWord = testWord.substring(0, testWord.length - 1);
				testMetrics = context.measureText(testWord);
			}
			//if the substring method made testWord shorter
			if (words[i] !== testWord) {
				//splice in an empty string
				words.splice(i + 1, 0, words[i].substr(testWord.length));
				//reset test word
				words[i] = testWord;
			}
			//add word to line and get metrics
			testWord = line + words[i] + " ";
			testMetrics = context.measureText(testWord);

			//if too big
			if (testMetrics.width > maxWidth && i > 0) {
				//stroke the text without the new word
				context.fillText(line, x, y);
				//reset line to be new word
				line = words[i] + " ";
				//set y of next line
				y += lineHeight;
			} else {
				//add word to the line, it fits
				line = testWord;
			}
		}
		//fill dat text
		context.fillText(line, x, y);
	}

	fillMixedText(
		ctx: CanvasRenderingContext2D,
		args: MixedTextInput[],
		{ x, y }: Coords
	) {
		let defaultFillStyle = ctx.fillStyle,
			defaultFont = ctx.font;

		ctx.save();
		for (let i = 0; i < args.length; i++) {
			const { text, fillStyle, font } = args[i];
			this.fillStyle(fillStyle || defaultFillStyle);
			this.font(font || defaultFont);
			ctx.fillText(text, x, y);
			x += ctx.measureText(text).width + 12;
		}
		ctx.restore();
	}

	font(font: string) {
		this.context.font = font;
		return this;
	}

	fillStyle(color: string | CanvasGradient | CanvasPattern) {
		this.context.fillStyle = color;
		return this;
	}

	strokeStyle(color: string | CanvasGradient | CanvasPattern) {
		this.context.strokeStyle = color;
		return this;
	}

	private reset() {
		this.fillStyle("#000");
		this.strokeStyle("fff");
		return this;
	}
}
