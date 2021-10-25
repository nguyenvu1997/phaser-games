import { settings } from '../Const.js';
import { Ball } from '../Objects/Ball.js';
import { Brick } from '../Objects/Brick.js';
import { Player } from '../Objects/Player.js';

const BRICK_COLORS: number[] = [0xf2e49b, 0xbed996, 0xf2937e, 0xffffff];

export class GamePlay extends Phaser.Scene {
    private ball: Ball;
    private bricks: Phaser.GameObjects.Group;
    private player: Player;
    private scoreText: Phaser.GameObjects.BitmapText;
    private highScoreText: Phaser.GameObjects.BitmapText;
    private livesText: Phaser.GameObjects.BitmapText;

    constructor() {
        super('gameplay');
    }

    preload() {
        this.load.pack('preload', './assets/Breakout/pack.json', 'preload');
        this.load.atlas('flares', 'assets/Phaser/flares.png', 'assets/Phaser/flares.json');
    }

    init(): void {
        settings.highScore = settings.score;
        settings.score = 0;
        settings.lives = 3;
    }

    create(): void {
        this.bricks = this.add.group();

        const BRICKS = settings.LEVELS[settings.currentLevel].BRICKS;
        const WIDTH = settings.LEVELS[settings.currentLevel].WIDTH;
        const HEIGHT = settings.LEVELS[settings.currentLevel].HEIGHT;
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                this.bricks.add(
                    new Brick({
                        scene: this,
                        x: (settings.BRICK.WIDTH + settings.BRICK.SPACING) * x,
                        y:
                            settings.BRICK.MARGIN_TOP +
                            y * (settings.BRICK.HEIGHT + settings.BRICK.SPACING),
                        width: settings.BRICK.WIDTH,
                        height: settings.BRICK.HEIGHT,
                        fillColor: BRICK_COLORS[BRICKS[y * 14 + x]]
                    })
                );
            }
        }

        // Player
        this.player = new Player({
            scene: this,
            x: +this.game.config.width / 2 - 20,
            y: +this.game.config.height - 50,
            width: 50,
            height: 10
        });

        var particles = this.add.particles('flares');
        particles.createEmitter({
            frame: 'white',
            speedX: 0,
            tint: [0xffff00, 0xff0000, 0x00ff00, 0x0000ff],
            lifespan: 500,
            frequency: 50,
            blendMode: 'ADD',
            follow: this.player,
            scale: 0.1
        });

        // Ball
        this.ball = new Ball({ scene: this, x: 0, y: 0 }).setVisible(false);
        let count = 0
        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            onUpdate: tween => {
                count++;
                if (count < 50) {
                    this.ball.setFillStyle(0xffffff)
                } else if (count < 100) {
                    this.ball.setFillStyle(0xCD5C5C)
                } else {
                    count = 0
                }
            }
        });

        this.scoreText = this.add.bitmapText(10, 10, 'font', `Score: ${settings.score}`, 8);

        this.highScoreText = this.add.bitmapText(10, 20, 'font', `Highscore: ${settings.highScore}`, 8);

        this.livesText = this.add.bitmapText(10, 30, 'font', `Lives: ${settings.lives}`, 8);

        // Collisions
        this.physics.add.collider(this.player, this.ball);
        this.physics.add.collider(this.ball, this.bricks, this.ballBrickCollision, null, this);

        // Events
        this.events.on('scoreChanged', this.updateScore, this);
        this.events.on('livesChanged', this.updateLives, this);

        // Physics
        this.physics.world.checkCollision.down = false;
    }

    update(): void {
        this.player.update();

        if (this.player.body.velocity.x !== 0 && !this.ball.visible) {
            this.ball.setPosition(this.player.x, this.player.y - 200);
            this.ball.applyInitVelocity();
            this.ball.setVisible(true);
        }

        if (this.ball.y > this.game.config.height) {
            settings.lives -= 1;
            this.events.emit('livesChanged');

            if (settings.lives === 0) {
                this.gameOver();
            } else {
                this.player.body.setVelocity(0);
                this.player.resetToStartPosition();
                this.ball.setPosition(0, 0);
                this.ball.body.setVelocity(0);
                this.ball.setVisible(false);
            }
        }
    }

    private ballBrickCollision(ball: Ball, brick: Brick): void {
        brick.destroy();
        settings.score += 10;
        this.events.emit('scoreChanged');

        if (this.bricks.countActive() === 0) {
            this.scene.start('gameplay')
        }
    }

    private gameOver(): void {
        this.scene.restart();
    }

    private updateScore(): void {
        this.scoreText.setText(`Score: ${settings.score}`);
    }

    private updateLives(): void {
        this.livesText.setText(`Lives: ${settings.lives}`);
    }
}
