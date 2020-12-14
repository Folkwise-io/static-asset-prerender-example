import * as path from "path";
import {
  createCanvas,
  registerFont,
  Canvas,
  CanvasRenderingContext2D,
} from "canvas";

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

interface Coords {
  x: number;
  y: number;
}

export default class ImageBuilder {
  private context: CanvasRenderingContext2D;
  private canvas: Canvas;
  private finished: boolean;

  constructor(private width: number, private height: number) {
    this.canvas = createCanvas(width, height);
    this.context = this.canvas.getContext("2d");
    this.reset();
    this.finished = false;
  }

  background(color: string) {
    this.fillStyle(color);
    this.context.fillRect(0, 0, this.width, this.height);
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

  build() {
    if (this.finished) {
      throw new Error(
        "ImageBuilder.build() can only be called once. You must construct a new ImageBuilder for each image you are building."
      );
    }
    this.finished = true;
    return this.canvas.toBuffer("image/png");
  }

  private font(font: string) {
    this.context.font = font;
    return this;
  }

  private fillStyle(color: string | CanvasGradient | CanvasPattern) {
    this.context.fillStyle = color;
    return this;
  }

  private strokeStyle(color: string | CanvasGradient | CanvasPattern) {
    this.context.strokeStyle = color;
    return this;
  }

  private reset() {
    this.fillStyle("#000");
    this.strokeStyle("fff");
    return this;
  }
}
