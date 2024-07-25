import { Boat } from './Boat';
import { Parachutist } from './Parachutist';
import { Plane, planeImage } from './Plane';

const seaImage = new Image ();
seaImage.src = '../resources/sea.png';

const background = new Image ();
background.src = '../resources/background.png';

// VARIABLES THAT CAN BE CHANGED TO ADJUST DIFFICULTY OF THE GAME
const boatWidth = 244
const boatHeight = 153
const boatSpeed = 25
const planeSpeed = 1
const parachutistSpeed = 1
// higher value = parachutists jump out at a higher rate
const parachutistJumpRate = 0.0015 

export class Game {
    boat: Boat;
    parachutists: Parachutist[];
    plane: Plane;
    lives: number;
    score: number;
    canvasWidth: number;
    canvasHeight: number;
    gameOver: boolean;
    canvas: HTMLCanvasElement;

    constructor(canvasWidth: number, canvasHeight: number, canvas: HTMLCanvasElement) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        // This makes sure the boat is always on top of the sea
        const boatStartY = canvasHeight - seaImage.height - boatHeight / 2;
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

    tick() {
        // Check if game is over
        if (this.gameOver) return;
        
        // Tick airplane
        this.plane.tick();
        
        // Push parachutists out at random times (Difficulty can be adjusted)
        if (Math.random() < parachutistJumpRate) {
            // Speed of parachutist can be changed to adjust difficulty
            this.parachutists.push(new Parachutist(this.plane.x, this.plane.y, parachutistSpeed));
        }

        // Tick all parachutists
        for (let i = this.parachutists.length - 1; i >= 0; i--) {
            const parachutist = this.parachutists[i];
            parachutist.tick();
            if (this.checkCollision(parachutist, this.boat)) {
                this.score += 10;
                // Removes the parachutist from the map
                this.parachutists.splice(i, 1);
            // If parachutist hits water, deduct lives
            } else if (parachutist.y > this.canvasHeight - seaImage.height) {
                this.lives -= 1;
                // Removes the parachutist from the map
                this.parachutists.splice(i, 1);
            }
        }

        if (this.lives <= 0) {
            this.endGame();
        }

    }

    // This function checks for overlap between the bounding boxes of the parachutist and the boat.
    // Returns boolean 'true' if they overlap and boolean 'false' if they do not overlap.
    checkCollision(parachutist: Parachutist, boat: Boat): boolean {
        return (
            parachutist.x < boat.x + boat.width &&
            parachutist.x + parachutist.width > boat.x &&
            parachutist.y < boat.y + boat.height &&
            parachutist.y + parachutist.height > boat.y
        );
    }

    endGame() {
        this.gameOver = true;
    }

    render() {
        const context = this.canvas.getContext('2d');
        if (context) {
            // Clears the canvas every render
            context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            context.drawImage(background, 0, 0, this.canvasWidth, this.canvasHeight);

            // Draw the score and lives
            context.fillStyle = 'black';
            context.font = '20px Arial';
            context.fillText(`Score: ${this.score}`, 10, 20);
            context.fillText(`Lives: ${this.lives}`, 10, 40);
            
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
            for (let parachutist of this.parachutists) {
                parachutist.render(context);
            }
        }
    }

}