const boatImage = new Image();
boatImage.src = '../resources/boat.png';

export class Boat {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    constructor(x: number, y: number, width: number, height: number, speed: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(boatImage, this.x, this.y, this.width, this.height);
    }
}