import { Bird } from "../Objects/Bird.js";
import { Pipe } from "../Objects/Pipe.js";
export class GamePlay extends Phaser.Scene {
    constructor() {
        super("gameplay");
        console.log("gameplay");
    }
    init() {
        this.registry.set('score', -1);
    }
    create() {
        this.background = this.add.tileSprite(0, 0, 390, 600, 'background')
            .setOrigin(0, 0);
        this.scoreText = this.add.bitmapText(195 - 14, 30, 'font', this.registry.values.score)
            .setDepth(2);
        this.pipes = this.add.group({});
        this.bird = new Bird(this, 50, 100, 'bird');
        this.addNewRowOfPipes();
        this.timer = this.time.addEvent({
            delay: 1500,
            callback: this.addNewRowOfPipes,
            callbackScope: this,
            loop: true
        });
        this.physics.add.collider(this.bird, this.pipes, function () {
            this.bird.setDead(true);
            console.log("overlap");
        }, null, this);
    }
    addNewRowOfPipes() {
        // Update The Score
        this.registry.values.score += 1;
        this.scoreText.setText(this.registry.values.score);
        // Randomly Pick A Number Between 1 And 5
        let hole = Math.floor(Math.random() * 5) + 1;
        // add 6 pipes with one big hole at position hole and hole + 1
        for (let i = 0; i < 10; i++) {
            if (i !== hole && i !== hole + 1 && i !== hole + 2) {
                if (i === hole - 1) {
                    this.pipes.add(new Pipe(this, 400, i * 60, 'pipe', 0));
                }
                else if (i === hole + 3) {
                    this.pipes.add(new Pipe(this, 400, i * 60, 'pipe', 1));
                }
                else {
                    this.pipes.add(new Pipe(this, 400, i * 60, 'pipe', 2));
                }
            }
        }
    }
    update() {
        if (!this.bird.getDead()) {
            this.background.tilePositionX += 4;
            this.bird.update();
        }
        else {
            Phaser.Actions.Call(this.pipes.getChildren(), function (pipe) {
                pipe.body.setVelocityX(0);
            }, this);
        }
        if (this.bird.y > this.sys.canvas.height) {
            this.scene.start('mainmenu');
        }
    }
}
