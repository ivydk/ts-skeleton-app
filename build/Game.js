import GameLoop from './GameLoop.js';
import Start from './Start.js';
export default class Game {
    canvas;
    gameLoop;
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 400;
        this.canvas.height = 600;
        this.gameLoop = new GameLoop();
        this.gameLoop.start(new Start(this));
        console.log('game');
        const backgroundId = document.querySelector('canvas');
        console.log(backgroundId);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    static changeBackgroundImg(pictureName) {
        document.body.style.backgroundImage = `url("assets/img/${pictureName}")`;
    }
    writeTextToCanvas(text, xPos, yPos, fontSize, color, alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xPos, yPos);
    }
    getCtx = () => this.canvas.getContext('2d');
}
//# sourceMappingURL=Game.js.map