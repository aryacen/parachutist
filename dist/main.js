import { Game } from './Game.js';
var canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 800;
document.body.appendChild(canvas);
var context = canvas.getContext('2d');
var background = new Image();
var seaImage = new Image();
var boatImage = new Image();
var parachutistImage = new Image();
var planeImage = new Image();
background.src = '../resources/background.png';
seaImage.src = '../resources/sea.png';
boatImage.src = '../resources/boat.png';
parachutistImage.src = '../resources/parachutist.png';
planeImage.src = '../resources/plane.png';
background.onload = function () { return console.log('Background loaded'); };
seaImage.onload = function () { return console.log('Sea image loaded'); };
boatImage.onload = function () { return console.log('Boat image loaded'); };
parachutistImage.onload = function () { return console.log('Parachutist image loaded'); };
planeImage.onload = function () { return console.log('Plane image loaded'); };
function startGame() {
    console.log('Starting game');
    if (context) {
        var game_1 = new Game(canvas.width, canvas.height, canvas);
        var gameLoop_1 = function () {
            game_1.tick();
            game_1.render();
            if (!game_1.gameOver) {
                requestAnimationFrame(gameLoop_1);
            }
        };
        gameLoop_1();
        // Event listener for mouse movement
        canvas.addEventListener('mousemove', function (event) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = event.clientX - rect.left;
            game_1.boat.x = mouseX - game_1.boat.width / 2;
        });
        // Event listener for keyboard movement
        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                game_1.boat.moveLeft();
            }
            else if (event.key === 'ArrowRight') {
                game_1.boat.moveRight();
            }
        });
    }
    else {
        console.error('Failed to get 2D context');
    }
}
var images = [background, seaImage, boatImage, parachutistImage, planeImage];
var imagesLoaded = 0;
images.forEach(function (img) {
    img.onload = function () {
        imagesLoaded++;
        console.log("Image loaded: ".concat(img.src));
        if (imagesLoaded === images.length) {
            startGame();
        }
    };
});
