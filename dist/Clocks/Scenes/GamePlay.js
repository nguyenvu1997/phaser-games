import { settings } from '../Const.js';
import { Ball } from '../Objects/Ball.js';
import { Clock } from '../Objects/Clock.js';
export class GamePlay extends Phaser.Scene {
    constructor() {
        super('gameplay');
    }
    preload() {
        this.load.pack('preload', './assets/Clocks/pack.json', 'preload');
        this.load.atlas('flares', 'assets/Phaser/flares.png', 'assets/Phaser/flares.json');
    }
    init() {
        // Variables
        this.canFire = true;
        this.clocksReached = 1;
        this.numberClocks = 0;
    }
    create() {
        this.clocksArray = [];
        this.clockGroup = this.add.group();
        for (let i = 0; i < settings.LEVELS[settings.currentLevel].CLOCKS.length; i++) {
            console.log(settings.LEVELS[settings.currentLevel].CLOCKS[i]);
            switch (settings.LEVELS[settings.currentLevel].CLOCKS[i]) {
                // Small Clock
                case 1:
                    this.clocksArray.push(this.addNewClock(new Phaser.Math.Vector2((i % settings.LEVEL_WIDTH_IN_TILES) * 2 + 1, Math.floor(i / settings.LEVEL_HEIGHT_IN_TILES) * 2 + 1), 'small'));
                    break;
                // Big Clock
                case 2:
                    this.clocksArray.push(this.addNewClock(new Phaser.Math.Vector2((i % settings.LEVEL_WIDTH_IN_TILES) * 2 + 2, Math.floor(i / settings.LEVEL_HEIGHT_IN_TILES) * 2), 'big'));
                    break;
            }
        }
        this.activeClock = Phaser.Utils.Array.GetRandom(this.clocksArray);
        this.activeClock.setActiveAppearance();
        this.ball = new Ball({
            scene: this,
            x: +this.game.config.width / 2,
            y: +this.game.config.height / 2,
            texture: 'ball'
        });
        this.physics.world.on('worldbounds', function () {
            this.scene.start('gameplay');
        }, this);
        this.input.on('pointerdown', this.throwBall, this);
        this.physics.add.overlap(this.ball, this.clockGroup, this.handleBallClockOverlap, null, this);
    }
    addNewClock(clockCoordinates, prefix) {
        const newClock = new Clock({
            scene: this,
            x: clockCoordinates.x * settings.GRID_SIZE_IN_PIXELS,
            y: clockCoordinates.y * settings.GRID_SIZE_IN_PIXELS,
            texture: prefix + 'clock',
            prefix: prefix
        });
        this.clockGroup.add(newClock);
        this.numberClocks++;
        return newClock;
    }
    throwBall() {
        if (this.canFire) {
            this.canFire = false;
            this.ball.setPosition(this.activeClock.x, this.activeClock.y);
            this.ball.setVisible(true);
            const handAngle = this.activeClock.getCurrentHandRotation();
            const ballVelocity = this.physics.velocityFromRotation(handAngle, this.ball.getSpeed());
            this.ball.body.setVelocity(ballVelocity.x, ballVelocity.y);
            this.activeClock.kill();
        }
    }
    handleBallClockOverlap(ball, clock) {
        if (!this.canFire) {
            clock.setActiveAppearance();
            this.activeClock = clock;
            this.ball.setVisible(false);
            this.ball.body.setVelocity(0, 0);
            this.clocksReached++;
            if (this.clocksReached < this.numberClocks) {
                this.canFire = true;
            }
            else {
                this.time.addEvent({
                    delay: 1500,
                    callbackScope: this,
                    callback: function () {
                        settings.currentLevel += 1;
                        this.scene.start('gameplay');
                    }
                });
            }
        }
    }
}
