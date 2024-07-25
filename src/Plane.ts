export const planeImage = new Image();
planeImage.src = '../resources/plane.png';

export class Plane {
    x: number;
    y: number;
    speed: number;
    canvasWidth: number;

    constructor(x: number, y: number, speed: number, canvasWidth: number) {
        this.x = canvasWidth;
        this.y = y;
        this.speed = speed;
        this.canvasWidth = canvasWidth;
    }

    tick() {
        this.x -= this.speed;
        if (this.x < -planeImage.width) {
            this.x = this.canvasWidth;
        }
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(planeImage, this.x, this.y);
    }
}