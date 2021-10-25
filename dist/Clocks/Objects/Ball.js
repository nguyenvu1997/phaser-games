export class Ball extends Phaser.GameObjects.Image {
    constructor(aParams) {
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
    initVariables() {
        this.speed = 600;
    }
    initImage() {
        this.setVisible(false);
    }
    initPhysics() {
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
    }
    getSpeed() {
        return this.speed;
    }
}
