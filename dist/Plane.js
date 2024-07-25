export var planeImage = new Image();
planeImage.src = '../resources/plane.png';
var Plane = /** @class */ (function () {
    function Plane(x, y, speed, canvasWidth) {
        this.x = canvasWidth;
        this.y = y;
        this.speed = speed;
        this.canvasWidth = canvasWidth;
    }
    Plane.prototype.tick = function () {
        this.x -= this.speed;
        if (this.x < -planeImage.width) {
            this.x = this.canvasWidth;
        }
    };
    Plane.prototype.render = function (context) {
        context.drawImage(planeImage, this.x, this.y);
    };
    return Plane;
}());
export { Plane };
