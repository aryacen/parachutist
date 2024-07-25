var parachutistImage = new Image();
parachutistImage.src = '../resources/parachutist.png';
var Parachutist = /** @class */ (function () {
    function Parachutist(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = parachutistImage.width;
        this.height = parachutistImage.height;
    }
    Parachutist.prototype.tick = function () {
        this.y += this.speed;
    };
    Parachutist.prototype.render = function (context) {
        context.drawImage(parachutistImage, this.x, this.y, 50, 50);
    };
    return Parachutist;
}());
export { Parachutist };
