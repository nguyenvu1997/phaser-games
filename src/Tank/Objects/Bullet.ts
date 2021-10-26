import { IBulletConstructor } from "../Interfaces.js";

export class Bullet extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body;
    particles;

    private bulletSpeed: number;

    constructor(aParams: IBulletConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture);

        this.rotation = aParams.rotation;

        // Image
        this.setOrigin(0.5, 0.5);
        this.setDepth(2);

        // Variables
        this.bulletSpeed = 1000;

        // Physics
        this.scene.physics.world.enable(this);
        this.scene.physics.velocityFromRotation(
            this.rotation - Math.PI / 2,
            this.bulletSpeed,
            this.body.velocity
        );

        // Animtation
        let tween = this.scene.tweens.add({
            targets: this,
            alpha: { start: 0.5, end: 1 }
        });

        // Particles Effects
        this.particles = this.scene.add.particles('blackSmoke00');

        this.particles.createEmitter({
            speed: 100,
            lifespan: 100,
            frequency: 0,
            blendMode: 'ADD',
            follow: this,
            scale: { start: 0.2, end: 0 },
        });

        this.scene.add.existing(this);
    }

    endEffect() {
        this.particles.destroy();
    }

    update(): void { }
}
