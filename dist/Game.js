import { Boat } from './Boat.js';
import { Parachutist } from './Parachutist.js';
import { Plane, planeImage } from './Plane.js';
var seaImage = new Image();
seaImage.src = '../resources/sea.png';
var background = new Image();
background.src = '../resources/background.png';
// VARIABLES THAT CAN BE CHANGED TO ADJUST DIFFICULTY OF THE GAME
var boatWidth = 244;
var boatHeight = 153;
var boatSpeed = 25;
var planeSpeed = 1;
var parachutistSpeed = 1;
// higher value = parachutists jump out at a higher rate
var parachutistJumpRate = 0.0015;
var Game = /** @class */ (function () {
    function Game(canvasWidth, canvasHeight, canvas) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        // This makes sure the boat is always on top of the sea
        var boatStartY = canvasHeight - seaImage.height - boatHeight / 2;
        // Width, Height, and Speed of the boat can be changed for a more difficult or easy experience
        this.boat = new Boat(canvasWidth / 2, boatStartY, boatWidth, boatHeight, boatSpeed);
        this.parachutists = [];
        // Plane speed can be changed to adjust difficulty
        this.plane = new Plane(-planeImage.width, 10, planeSpeed, this.canvasWidth);
        this.lives = 3;
        this.score = 0;
        this.gameOver = false;
        this.canvas = canvas;
    }
    Game.prototype.tick = function () {
        // Check if game is over
        if (this.gameOver)
            return;
        // Tick airplane
        this.plane.tick();
        // Push parachutists out at random times (Difficulty can be adjusted)
        if (Math.random() < parachutistJumpRate) {
            // Speed of parachutist can be changed to adjust difficulty
            this.parachutists.push(new Parachutist(this.plane.x, this.plane.y, parachutistSpeed));
        }
        // Tick all parachutists
        for (var i = this.parachutists.length - 1; i >= 0; i--) {
            var parachutist = this.parachutists[i];
            parachutist.tick();
            if (this.checkCollision(parachutist, this.boat)) {
                this.score += 10;
                // Removes the parachutist from the map
                this.parachutists.splice(i, 1);
                // If parachutist hits water, deduct lives
            }
            else if (parachutist.y > this.canvasHeight - seaImage.height) {
                this.lives -= 1;
                // Removes the parachutist from the map
                this.parachutists.splice(i, 1);
            }
        }
        if (this.lives <= 0) {
            this.endGame();
        }
    };
    // This function checks for overlap between the bounding boxes of the parachutist and the boat.
    // Returns boolean 'true' if they overlap and boolean 'false' if they do not overlap.
    Game.prototype.checkCollision = function (parachutist, boat) {
        return (parachutist.x < boat.x + boat.width &&
            parachutist.x + parachutist.width > boat.x &&
            parachutist.y < boat.y + boat.height &&
            parachutist.y + parachutist.height > boat.y);
    };
    Game.prototype.endGame = function () {
        this.gameOver = true;
    };
    Game.prototype.render = function () {
        var context = this.canvas.getContext('2d');
        if (context) {
            // Clears the canvas every render
            context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            context.drawImage(background, 0, 0, this.canvasWidth, this.canvasHeight);
            // Draw the score and lives
            context.fillStyle = 'black';
            context.font = '20px Arial';
            context.fillText("Score: ".concat(this.score), 10, 20);
            context.fillText("Lives: ".concat(this.lives), 10, 40);
            // Shows the game over screen
            if (this.gameOver) {
                context.fillStyle = "red";
                context.font = "40px Arial";
                context.fillText("Game Over", this.canvasWidth / 2 - 100, this.canvasHeight / 2);
                context.fillText("Score: " + this.score, this.canvasWidth / 2 - 100, this.canvasHeight / 2 + 50);
                return;
            }
            // Renders the sea, boat, plane, and parachutist(s)
            context.drawImage(seaImage, 0, this.canvasHeight - seaImage.height);
            this.boat.render(context);
            this.plane.render(context);
            for (var _i = 0, _a = this.parachutists; _i < _a.length; _i++) {
                var parachutist = _a[_i];
                parachutist.render(context);
            }
        }
    };
    return Game;
}());
export { Game };
