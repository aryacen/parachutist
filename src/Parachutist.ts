const parachutistImage = new Image();
parachutistImage.src = '../resources/parachutist.png';

export class Parachutist {
    x: number;
    y: number;
    speed: number;
    width: number;
    height: number;
    constructor(x: number, y: number, speed: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = parachutistImage.width;
        this.height = parachutistImage.height;
    }
    tick() {
        this.y += this.speed;
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(parachutistImage, this.x, this.y, 50, 50);
    }

}