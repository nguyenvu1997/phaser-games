import { CONST } from "../Const.js";
import { Apple } from "../Objects/Apple.js";
import { Snake } from "../Objects/Snake.js";

export class GamePlay extends Phaser.Scene {
    private gameHeight: number;
    private gameWidth: number;
    private boardWidth: number;
    private boardHeight: number;
    private horizontalFields: number;
    private verticalFields: number;
    private tick: number;

    private player: Snake;
    private apple: Apple;
    private gameBorder: Phaser.GameObjects.Graphics[];

    private scoreText: Phaser.GameObjects.BitmapText;

    constructor() {
        super('gameplay');
    }

    init(): void {
        this.gameHeight = this.sys.canvas.height;
        this.gameWidth = this.sys.canvas.width;
        this.boardWidth = this.gameWidth - 2 * CONST.FIELD_SIZE;
        this.boardHeight = this.gameHeight - 2 * CONST.FIELD_SIZE;
        this.horizontalFields = this.boardWidth / CONST.FIELD_SIZE;
        this.verticalFields = this.boardHeight / CONST.FIELD_SIZE;
        this.tick = 0;
    }

    create(): void {
        this.gameBorder = [];
        let i = 0;
        for (let x = 0; x < this.gameWidth / CONST.FIELD_SIZE; x++) {
            for (let y = 0; y < this.gameHeight / CONST.FIELD_SIZE; y++) {
                if (
                    y === 0 ||
                    y === this.gameHeight / CONST.FIELD_SIZE - 1 ||
                    x === 0 ||
                    x === this.gameWidth / CONST.FIELD_SIZE - 1
                ) {
                    this.gameBorder[i] = this.add
                        .graphics({
                            x: -CONST.FIELD_SIZE + x * CONST.FIELD_SIZE,
                            y: -CONST.FIELD_SIZE + y * CONST.FIELD_SIZE,
                            fillStyle: { color: 0x61e85b, alpha: 0.3 }
                        })
                        .fillRect(
                            CONST.FIELD_SIZE,
                            CONST.FIELD_SIZE,
                            CONST.FIELD_SIZE,
                            CONST.FIELD_SIZE
                        );
                    i++;
                }
            }
        }

        this.player = new Snake(this);
        this.apple = new Apple({
            scene: this,
            options: {
                x: this.rndXPos(),
                y: this.rndYPos()
            }
        });



        // Text
        this.scoreText = this.add.bitmapText(this.gameWidth / 2, 1, 'snakeFont', '' + CONST.SCORE, 8);
    }

    update(time: number): void {
        if (this.tick === 0) {
            this.tick = time;
        }
        if (!this.player.isDead()) {
            if (time - this.tick > 100) {
                this.player.move();
                this.checkCollision();
                this.tick = time;
            }
            this.player.handleInput();
        } else {
            this.scene.start('mainmenu');
        }
    }

    private checkCollision(): void {
        const { x: headX, y: headY } = this.player.getHead();
        var particles = this.add.particles('flares');
        particles.createEmitter({
            frame: { frames: ['red', 'blue', 'green', 'yellow'], cycle: true },
            x: 100,
            y: 100,
            speed: 200,
            blendMode: 'ADD',
            scale: { start: 0.2, end: 0 },
            on: false
        });

        // Collisions
        // Player & Apple
        if (headX === this.apple.x && headY === this.apple.y) {
            particles.emitParticleAt(this.apple.x, this.apple.y, 10)
            this.player.growSnake();
            CONST.SCORE++;
            this.scoreText.setText('' + CONST.SCORE);
            this.apple.newApplePosition(this.rndXPos(), this.rndYPos());
            this.tweens.add({
                targets: this.apple,
                duration: 500,
                scale: { from: 0.5, to: 1 },
            });

        }

        // Player & Border
        for (const { x, y } of this.gameBorder) {
            if (headX === x && headY === y) {
                this.player.setDead(true);
            }
        }

        // Snake & Snake Body
        this.player.checkSnakeSnakeCollision();
    }

    private rndXPos(): number {
        return (
            Phaser.Math.RND.between(1, this.horizontalFields - 1) * CONST.FIELD_SIZE
        );
    }

    private rndYPos(): number {
        return (
            Phaser.Math.RND.between(1, this.verticalFields - 1) * CONST.FIELD_SIZE
        );
    }
}
