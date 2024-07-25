var boatImage = new Image();
boatImage.src = '../resources/boat.png';
var Boat = /** @class */ (function () {
    function Boat(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
    Boat.prototype.moveLeft = function () {
        this.x -= this.speed;
    };
    Boat.prototype.moveRight = function () {
        this.x += this.speed;
    };
    Boat.prototype.render = function (context) {
        context.drawImage(boatImage, this.x, this.y, this.width, this.height);
    };
    return Boat;
}());
export { Boat };
