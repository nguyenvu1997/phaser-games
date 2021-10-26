import { PlayerTwo } from '../objects/playerTwo.js';
import { PlayerOne } from '../Objects/PlayerOne.js';
import { Wall } from '../Objects/Wall.js';
export class GamePlay extends Phaser.Scene {
    constructor() {
        super('gameplay');
        this.CONST = {
            P1_SCORE: 0,
            P2_SCORE: 0,
            FIELD_SIZE: 8
        };
    }
    init() {
        this.gameHeight = this.sys.canvas.height;
        this.gameWidth = this.sys.canvas.width;
        this.boardWidth = this.gameWidth - 2 * this.CONST.FIELD_SIZE;
        this.boardHeight = this.gameHeight - 2 * this.CONST.FIELD_SIZE;
        this.horizontalFields = this.boardWidth / this.CONST.FIELD_SIZE;
        this.verticalFields = this.boardHeight / this.CONST.FIELD_SIZE;
        this.tick = 0;
    }
    create() {
        this.player = new PlayerOne(this, 12, 12, 'right');
        this.playerTwo = new PlayerTwo(this, 244, 212, 'left');
        this.gameBorder = [];
        let i = 0;
        for (let x = 0; x < this.gameWidth / this.CONST.FIELD_SIZE; x++) {
            for (let y = 0; y < this.gameHeight / this.CONST.FIELD_SIZE; y++) {
                if (y === 0 ||
                    y === this.gameHeight / this.CONST.FIELD_SIZE - 1 ||
                    x === 0 ||
                    x === this.gameWidth / this.CONST.FIELD_SIZE - 1) {
                    this.gameBorder[i] = new Wall(this, this.CONST.FIELD_SIZE / 2 + x * this.CONST.FIELD_SIZE, this.CONST.FIELD_SIZE / 2 + y * this.CONST.FIELD_SIZE, 'border');
                    i++;
                }
            }
        }
        // Particles Effects
        let rect = new Phaser.Geom.Rectangle(4, 4, 248, 217);
        let particles = this.add.particles('flares');
        particles.createEmitter({
            frame: 'white',
            lifespan: 400,
            scale: { start: 0.1, end: 0 },
            emitZone: { type: 'edge', source: rect, quantity: 100 }
        });
        this.scoreText = this.add.bitmapText(this.gameWidth / 2 - 20, 0, 'pcsenior', this.CONST.P1_SCORE + ' : ' + this.CONST.P2_SCORE, 8);
    }
    update(time) {
        for (let wall of this.gameBorder) {
            wall.update();
        }
        if (this.tick === 0) {
            this.tick = time;
        }
        if (!this.player.isDead() && !this.playerTwo.isDead()) {
            if (time - this.tick > 200) {
                this.player.move();
                this.playerTwo.move();
                this.player.grow();
                this.playerTwo.grow();
                this.checkCollision();
                this.tick = time;
            }
            this.player.handleInput();
            this.playerTwo.handleInput();
        }
        else {
            if (this.player.isDead()) {
                this.CONST.P2_SCORE++;
            }
            else {
                this.CONST.P1_SCORE++;
            }
            this.scoreText.setText(this.CONST.P1_SCORE + ' : ' + this.CONST.P2_SCORE);
            if (this.CONST.P1_SCORE === 6 || this.CONST.P2_SCORE === 6) {
                this.scene.start('mainmenu');
            }
            else {
                this.scene.restart();
            }
        }
    }
    checkCollision() {
        // Snake & Border
        for (let i = 0; i < this.gameBorder.length; i++) {
            if (this.player.getHead().x === this.gameBorder[i].x &&
                this.player.getHead().y === this.gameBorder[i].y) {
                this.player.setDead(true);
            }
            if (this.playerTwo.getHead().x === this.gameBorder[i].x &&
                this.playerTwo.getHead().y === this.gameBorder[i].y) {
                this.playerTwo.setDead(true);
            }
        }
        // Snake 1 & Snake 2
        let playerOneBody = this.player.getBody();
        let bodiesMerged = playerOneBody.concat(this.playerTwo.getBody());
        for (let i = 0; i < bodiesMerged.length; i++) {
            if (this.player.getBody().length > 1 &&
                this.player.getHead().x === bodiesMerged[i].x &&
                this.player.getHead().y === bodiesMerged[i].y) {
                this.player.setDead(true);
            }
            if (this.playerTwo.getBody().length > 1 &&
                this.playerTwo.getHead().x === bodiesMerged[i].x &&
                this.playerTwo.getHead().y === bodiesMerged[i].y) {
                this.playerTwo.setDead(true);
            }
        }
    }
    rndXPos() {
        return (Phaser.Math.RND.between(1, this.horizontalFields - 1) * this.CONST.FIELD_SIZE);
    }
    rndYPos() {
        return (Phaser.Math.RND.between(1, this.verticalFields - 1) * this.CONST.FIELD_SIZE);
    }
}
