import { Game } from './Game';

const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.width = 1000;
canvas.height = 800;
document.body.appendChild(canvas);
const context = canvas.getContext('2d');

const background = new Image();
const seaImage = new Image();
const boatImage = new Image();
const parachutistImage = new Image();
const planeImage = new Image();

background.src = '../resources/background.png';
seaImage.src = '../resources/sea.png';
boatImage.src = '../resources/boat.png';
parachutistImage.src = '../resources/parachutist.png';
planeImage.src = '../resources/plane.png';

background.onload = () => console.log('Background loaded');
seaImage.onload = () => console.log('Sea image loaded');
boatImage.onload = () => console.log('Boat image loaded');
parachutistImage.onload = () => console.log('Parachutist image loaded');
planeImage.onload = () => console.log('Plane image loaded');

function startGame() {
    console.log('Starting game');
    if (context) {
        const game = new Game(canvas.width, canvas.height, canvas);
        const gameLoop = () => {
            game.tick();
            game.render();
            if (!game.gameOver) {
                requestAnimationFrame(gameLoop);
            }
        }
        gameLoop();

        // Event listener for mouse movement
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            game.boat.x = mouseX - game.boat.width / 2;
        });

        // Event listener for keyboard movement
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                game.boat.moveLeft();
            } else if (event.key === 'ArrowRight') {
                game.boat.moveRight();
            }
        });
    } else {
        console.error('Failed to get 2D context');
    }
}

const images = [background, seaImage, boatImage, parachutistImage, planeImage];
let imagesLoaded = 0;
images.forEach((img) => {
    img.onload = () => {
        imagesLoaded++;
        console.log(`Image loaded: ${img.src}`);
        if (imagesLoaded === images.length) {
            startGame();
        }
    };
});
