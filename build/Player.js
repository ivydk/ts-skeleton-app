import Game from './Game.js';
import KeyboardListener from './KeyboardListener.js';
export default class Player {
    static VELOCITY = 0.2;
    velocity;
    image;
    xPos;
    yPos;
    playerHeight;
    playerWidth;
    keyboardListener;
    speed;
    canvas;
    outOfCanvasSide;
    jumped;
    isJumping;
    startPoint;
    constructor(canvas) {
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
    draw(ctx) {
        ctx.drawImage(this.image, this.xPos, this.yPos, this.playerWidth, this.playerHeight);
    }
    move() {
        if (!this.xPosOutOfCanvas(this.canvas.width, this.canvas.height)) {
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)) {
                this.xPos -= this.speed;
            }
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)) {
                this.xPos += this.speed;
            }
        }
        if (this.outOfCanvasSide === 'left') {
            this.xPos += 1;
            this.outOfCanvasSide = '';
        }
        else if (this.outOfCanvasSide === 'right') {
            this.xPos -= 1;
            this.outOfCanvasSide = '';
        }
    }
    fall(platforms) {
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
    jump(startPoint) {
        this.isJumping = true;
        console.log(startPoint);
        if (this.yPos <= (startPoint + 50)) {
            this.speed = -2;
            this.isJumping = false;
            console.log('jump is doneee');
        }
    }
    xPosOutOfCanvas(canvasWidth, canvasHeight) {
        if (this.xPos + this.playerWidth >= canvasWidth || this.xPos <= 0) {
            console.log('x is out of canvas');
            if (this.xPos + this.playerWidth >= canvasWidth) {
                this.outOfCanvasSide = 'right';
            }
            else if (this.xPos <= 0) {
                this.outOfCanvasSide = 'left';
            }
            return true;
        }
        return false;
    }
    isCollidingWith(item) {
        if (this.xPos < item.getXPos() + item.getPlatformWidth()
            && this.xPos + this.playerWidth > item.getXPos()
            && this.yPos < item.getYPos() + item.getPlatformHeight()
            && this.yPos + this.playerHeight > item.getYPos()) {
            return true;
        }
        return false;
    }
    getYPos = () => this.yPos;
    setVelocity(plusVelocity) {
        this.velocity += plusVelocity;
    }
}
//# sourceMappingURL=Player.js.map