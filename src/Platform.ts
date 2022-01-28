import Game from './Game.js';
import Player from './Player.js';

export default class Platform {
  private image: HTMLImageElement;

  private xPos: number;

  private yPos: number;

  private platformHeight: number;

  private platformWidth: number;

  private canvas: HTMLCanvasElement;

  private platYChange: number;

  /**
   * Constructs a new instance of Player
   *
   * @param canvas canvas to render on
   * @param ypos what yPos?
   */
  public constructor(canvas: HTMLCanvasElement, ypos: number) {
    this.image = Game.loadNewImage('../assets/img/platform.png');

    this.canvas = canvas;

    this.platformHeight = 32.1;
    this.platformWidth = 150;

    this.xPos = Game.randomNumber(0, canvas.width - this.platformWidth);
    this.yPos = ypos;
  }

  /**
   * Draw the GameItem on the canvas
   *
   * @param ctx rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.xPos, this.yPos, this.platformWidth, this.platformHeight);
  }

  /**
   * Moves the platform
   */
  public move(): void {

  }

  public getXPos = (): number => this.xPos;

  public getYPos = (): number => this.yPos;

  public getImage = (): HTMLImageElement => this.image;

  public getPlatformHeight = (): number => this.platformHeight;

  public getPlatformWidth = (): number => this.platformWidth;

  public getYPlatChange = (): number => this.platYChange;


  public setPlatformHeight = (platformYChange: number): void => {
    this.yPos += platformYChange;
  };

  public setYPos = (yPos: number): void => {
    this.yPos = yPos;
  };

  public setYPlatChange = (change: number): void => {
    this.platYChange = change;
  }
}
