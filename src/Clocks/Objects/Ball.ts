import { IImageConstructor } from "../Interfaces.js";

export class Ball extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body;

    private speed: number;

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

        // Image
        this.setVisible(false);
        this.setTint(0xFCFF33)

        // Variables
        this.speed = 600;
        var particles = this.scene.add.particles('flares');

        // Physics
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        particles.createEmitter({
            frame: 'yellow',
            scale: 0.1,
            frequency: 100,
            follow: this,
            on: true,
        });

        this.scene.add.existing(this);
    }

    public getSpeed(): number {
        return this.speed;
    }
}
