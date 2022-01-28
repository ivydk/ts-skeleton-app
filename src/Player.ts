import Game from './Game.js';
import KeyboardListener from './KeyboardListener.js';
import Platform from './Platform.js';

export default class Player {
  // Player falls down with gravity
  private static VELOCITY = 0.2;

  private velocity: number;

  private image: HTMLImageElement;

  private xPos: number;

  private yPos: number;

  private playerHeight: number;

  private playerWidth: number;

  private keyboardListener: KeyboardListener;

  private speed: number;

  private canvas: HTMLCanvasElement;

  // `right` or `left`
  private outOfCanvasSide: string;

  private jumped: number;

  private isJumping: boolean;

  private startPoint: number;

  /**
   * Constructs a new instance of Player
   *
   * @param canvas canvas to render on
   */
  public constructor(canvas: HTMLCanvasElement) {
    this.image = Game.loadNewImage('../assets/img/player.png');
    this.keyboardListener = new KeyboardListener();

    this.canvas = canvas;

    this.playerHeight = 100;
    this.playerWidth = 75;

    this.xPos = (canvas.width / 2) - (this.playerWidth / 2);
    this.yPos = canvas.height - this.playerHeight;

    this.speed = 1;

    this.velocity = Player.VELOCITY;

    this.isJumping = false;
  }

  /**
   * Draw the GameItem on the canvas
   *
   * @param ctx rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.xPos, this.yPos, this.playerWidth, this.playerHeight);
  }

  /**
   * Moves the player when you press a key
   */
  public move(): void {
    // this.velocity += 0.1;
    // this.yPos -= this.velocity;

    // console.log(this.isJumping);

    if (!this.xPosOutOfCanvas(this.canvas.width, this.canvas.height)) {
      if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
        this.xPos -= this.speed;
      }

      if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
        this.xPos += this.speed;
      }
    }

    // TODO: Let the player go out of screen to the other side
    if (this.outOfCanvasSide === 'left') {
      this.xPos += 1;
      this.outOfCanvasSide = '';
    } else if (this.outOfCanvasSide === 'right') {
      this.xPos -= 1;
      this.outOfCanvasSide = '';
    }
  }

  /**
   * Makes the player fall
   *
   * @param platforms platform array
   */
  public fall(platforms: Platform[]): void {
    this.isJumping = false;

    platforms.forEach((platform) => {
      if (this.isCollidingWith(platform)) {
        this.jump(this.yPos);
        this.isJumping = true;
      }
    });

    if (!this.isJumping) {
      this.speed = 1;
    }

    this.yPos += this.speed;
  }

  /**
   * Jumps to a certain yPos
   *
   * @param startPoint starting point of the jump
   */
  public jump(startPoint: number): void {
    this.isJumping = true;
    // this.yPos -= 2;
    console.log(startPoint);
    // console.log('jump');
    if (this.yPos <= (startPoint + 50)) {
      // this.yPos -= this.speed;
      this.speed = -2;
      this.isJumping = false;
      console.log('jump is doneee');
    }
  }

  /**
   * Checks if Spy is out of canvas
   *
   * @param canvasWidth width of the canvas
   * @param canvasHeight height of the canvas
   * @returns `true` if the player is out of the canvas
   */
  public xPosOutOfCanvas(canvasWidth: number, canvasHeight: number): boolean {
    if (this.xPos + this.playerWidth >= canvasWidth || this.xPos <= 0) {
      console.log('x is out of canvas');
      // Determines witch side the player goes against
      if (this.xPos + this.playerWidth >= canvasWidth) {
        this.outOfCanvasSide = 'right';
      } else if (this.xPos <= 0) {
        this.outOfCanvasSide = 'left';
      }

      return true;
    }
    return false;
  }

  /**
   * Checks if the Character is colliding with a Coin
   *
   * @param item a Coin object
   * @returns `true` if the Character collides with the Coin
   */
  public isCollidingWith(item: Platform): boolean {
    if (
      this.xPos < item.getXPos() + item.getPlatformWidth()
      && this.xPos + this.playerWidth > item.getXPos()
      && this.yPos < item.getYPos() + item.getPlatformHeight()
      && this.yPos + this.playerHeight > item.getYPos()
      // && this.velocity > 0
    ) {
      // console.log('colliding');
      // this.velocity = 0;
      return true;
    }
    return false;
  }

  public getYPos = (): number => this.yPos;

  /**
   * Change the velocity
   *
   * @param plusVelocity velocity you want to add
   */
  public setVelocity(plusVelocity: number): void {
    this.velocity += plusVelocity;
  }
}
