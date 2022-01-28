import KeyboardListener from './KeyboardListener.js';
import Platform from './Platform.js';
import Player from './Player.js';
import Scene from './Scene.js';
import Score from './Score.js';
export default class Start extends Scene {
    keyboardListener;
    isFinished;
    game;
    player;
    score;
    platforms;
    numberOfPlatforms;
    jumpBool;
    constructor(game) {
        super();
        this.keyboardListener = new KeyboardListener();
        this.isFinished = false;
        this.game = game;
        this.player = new Player(this.game.canvas);
        this.score = new Score();
        this.numberOfPlatforms = 5;
        this.platforms = [];
        this.jumpBool = false;
        this.setUpPlatforms();
    }
    processInput() {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            console.log('SPACEBARRRR');
        }
        this.player.move();
        this.player.fall(this.platforms);
        this.player.xPosOutOfCanvas(this.game.canvas.width, this.game.canvas.height);
        this.playerCollidesWithPlatform();
        this.moveScreen();
        this.constructPlatforms();
    }
    update(elapsed) {
        if (this.isFinished) {
            return new Start(this.game);
        }
        return null;
    }
    render() {
        const ctx = this.game.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.writeTextToCanvas(`Score: ${this.score.getScore()}`, this.game.canvas.width / 2, 50, 30, 'white', 'center');
        this.player.draw(ctx);
        this.platforms.forEach((platform) => {
            platform.draw(ctx);
        });
    }
    playerCollidesWithPlatform() {
        this.platforms.forEach((platform) => {
            if (this.player.isCollidingWith(platform)) {
            }
            else {
            }
        });
    }
    moveScreen() {
        this.platforms.forEach((platform) => {
            if (this.player.getYPos() < 250) {
                platform.setPlatformHeight(3);
                platform.setYPlatChange(3);
            }
            else {
                platform.setYPlatChange(0);
                platform.setPlatformHeight(0);
            }
        });
    }
    setUpPlatforms() {
        for (let i = 0; i < this.numberOfPlatforms; i++) {
            const platGap = this.game.canvas.height / this.numberOfPlatforms;
            const newPlatformYPosition = i * platGap + platGap - 32.1;
            this.platforms.push(new Platform(this.game.canvas, newPlatformYPosition));
            console.log(newPlatformYPosition);
        }
    }
    constructPlatforms() {
        this.platforms = this.platforms.filter((platform) => {
            if (platform.getYPos() > this.game.canvas.height) {
                console.log('byee');
                console.log(this.platforms);
                return false;
            }
            return true;
        });
    }
}
//# sourceMappingURL=Start.js.map