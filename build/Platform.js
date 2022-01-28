import Game from './Game.js';
export default class Platform {
    image;
    xPos;
    yPos;
    platformHeight;
    platformWidth;
    canvas;
    platYChange;
    constructor(canvas, ypos) {
        this.image = Game.loadNewImage('../assets/img/platform.png');
        this.canvas = canvas;
        this.platformHeight = 32.1;
        this.platformWidth = 150;
        this.xPos = Game.randomNumber(0, canvas.width - this.platformWidth);
        this.yPos = ypos;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.xPos, this.yPos, this.platformWidth, this.platformHeight);
    }
    move() {
    }
    getXPos = () => this.xPos;
    getYPos = () => this.yPos;
    getImage = () => this.image;
    getPlatformHeight = () => this.platformHeight;
    getPlatformWidth = () => this.platformWidth;
    getYPlatChange = () => this.platYChange;
    setPlatformHeight = (platformYChange) => {
        this.yPos += platformYChange;
    };
    setYPos = (yPos) => {
        this.yPos = yPos;
    };
    setYPlatChange = (change) => {
        this.platYChange = change;
    };
}
//# sourceMappingURL=Platform.js.map