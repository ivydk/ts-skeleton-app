import Game from './Game.js';
import KeyboardListener from './KeyboardListener.js';
import Platform from './Platform.js';
import Player from './Player.js';
import Scene from './Scene.js';
import Score from './Score.js';

export default class Start extends Scene {
  private keyboardListener: KeyboardListener;

  private isFinished: boolean;

  private game: Game;

  private player: Player;

  private score: Score;

  private platforms: Platform[];

  private numberOfPlatforms: number;

  private jumpBool: boolean;

  /**
   * Constructs a new instance of Start
   *
   * @param game the instance of the game class
   */
  public constructor(game: Game) {
    super();

    this.keyboardListener = new KeyboardListener();

    this.isFinished = false;

    this.game = game;

    this.player = new Player(this.game.canvas);

    this.score = new Score();

    this.numberOfPlatforms = 5;
    this.platforms = [];

    // this.setUpPlatforms();

    this.jumpBool = false;
    this.setUpPlatforms();
  }

  /**
   * Handles any user input that has happened since the last call
   *
   */
  public processInput(): void {
    // TODO: Whyyyy?
    if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
      console.log('SPACEBARRRR');
    }

    // move the player
    this.player.move();

    this.player.fall(this.platforms);

    // checks if the player is out of th canvas
    this.player.xPosOutOfCanvas(this.game.canvas.width, this.game.canvas.height);

    // checks if the player collides with one of the platforms
    this.playerCollidesWithPlatform();

    // moves the platforms, looks like the screen is moving
    this.moveScreen();

    // TODO: should be responsible for constructing new platforms
    this.constructPlatforms();
  }

  /**
   * Advances the game simulation one step. It may run AI and physics (usually
   * in that order). The return value of this method determines what the `GameLoop`
   * that is animating this object will do next. If `null` is returned, the
   * GameLoop will render this scene and proceeds to the next animation frame.
   * If this methods returns a `Scene` (subclass) object, it will NOT render this
   * scene but will start considering that object as the current scene to animate.
   * In other words, by returning a Scene object, you can set the next scene to
   * animate.
   *
   * @param elapsed the time in ms that has been elapsed since the previous
   *   call
   * @returns a new `Scene` object if the game should start animating that scene
   *   on the next animation frame. If the game should just continue with the
   *   current scene, just return `null`
   */
  public update(elapsed: number): Scene {
    if (this.isFinished) {
      return new Start(this.game);
    }
    return null;
  }

  /**
   * Draw the game so the player can see what happened
   */
  public render(): void {
    const ctx = this.game.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    this.game.writeTextToCanvas(`Score: ${this.score.getScore()}`, this.game.canvas.width / 2, 50, 30, 'white', 'center');
    this.player.draw(ctx);

    this.platforms.forEach((platform) => {
      platform.draw(ctx);
    });
  }

  /**
   * what happens when the player collides with the platform
   */
  public playerCollidesWithPlatform(): void {
    this.platforms.forEach((platform) => {
      if (this.player.isCollidingWith(platform)) {
        // console.log('collides');`
        // this.player.jump();
      } else {
        // console.log('nopeee');
      }
    });
  }

  /**
   * When the player is above the 250 the platforms will go higher
   */
  public moveScreen(): void {
    this.platforms.forEach((platform) => {
      if (this.player.getYPos() < 250) {
        platform.setPlatformHeight(3);
        platform.setYPlatChange(3);
        // this.player.setVelocity(0.25);
      } else {
        platform.setYPlatChange(0);
        platform.setPlatformHeight(0);
      }
    });
  }

  /**
   * Sets up the first platforms
   */
  public setUpPlatforms(): void {
    for (let i = 0; i < this.numberOfPlatforms; i++) {
      const platGap = this.game.canvas.height / this.numberOfPlatforms;
      // 32.1 is the height of the platform
      const newPlatformYPosition = i * platGap + platGap - 32.1;
      this.platforms.push(
        new Platform(this.game.canvas, newPlatformYPosition),
      );
      console.log(newPlatformYPosition);
    }
  }

  /**
   * Constructs new platfroms
   */
  public constructPlatforms(): void {
    this.platforms = this.platforms.filter((platform) => {
      // check if the player is over (collided with) the garbage item.
      if (platform.getYPos() > this.game.canvas.height) {
        console.log('byee');
        console.log(this.platforms);
        return false;
      }
      return true;
    });
  }
}
