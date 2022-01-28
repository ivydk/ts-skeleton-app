import GameLoop from './GameLoop.js';
import Start from './Start.js';

export default class Game {
  // Necessary canvas attributes
  public readonly canvas: HTMLCanvasElement;

  private gameLoop: GameLoop;

  /**
   * Initialize the game
   *
   * @param canvas - The canvas element that the game
   * should be rendered upon
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.canvas.width = 400;
    this.canvas.height = 600;

    // Start the game cycle
    this.gameLoop = new GameLoop();
    this.gameLoop.start(new Start(this));

    console.log('game');

    const backgroundId = document.querySelector('canvas');
    console.log(backgroundId);

    // changes the background
    // document.body.style.backgroundImage = 'url("assets/img/background.jpeg")';
  }

  /**
   * Method to load an image
   *
   * @param source the source
   * @returns HTMLImageElement - returns an image
   */
  public static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * Returns a random number between min and max
   *
   * @param min - lower boundary
   * @param max - upper boundary
   * @returns a random number between min and max
   */
  public static randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }

  /**
   * function to change the background image
   *
   * @param pictureName name of the image in the img folder
   * !! you need to include the filetype
   * !! it searches from the img folder
   */
  public static changeBackgroundImg(pictureName: string): void {
    document.body.style.backgroundImage = `url("assets/img/${pictureName}")`;
  }

  /**
   * Writes text to the canvas
   *
   * @param text l
   * @param xPos l
   * @param yPos l
   * @param fontSize l
   * @param color l
   * @param alignment l
   */
  public writeTextToCanvas(
    text: string,
    xPos: number,
    yPos: number,
    fontSize: number,
    color: string,
    alignment: CanvasTextAlign = 'center',
  ): void {
    const ctx = this.canvas.getContext('2d');
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xPos, yPos);
  }

  public getCtx = (): CanvasRenderingContext2D => this.canvas.getContext('2d');
}
