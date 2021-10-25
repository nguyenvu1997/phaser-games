import { IImageConstructor } from "../Interfaces.js";

export class Ball extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body;

    private speed: number;

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

        this.initVariables();
        this.initImage();
        this.initPhysics();

        var particles = this.scene.add.particles('flares');

        particles.createEmitter({
            frame: 'yellow',
            scale: 0.1,
            frequency: 100,
            follow: this,
            on: true,
        });

        this.scene.add.existing(this);
    }

    private initVariables() {
        this.speed = 600;
    }

    private initImage() {
        this.setVisible(false);
    }

    private initPhysics() {
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
    }

    public getSpeed(): number {
        return this.speed;
    }
}
