export class Bullet extends Phaser.GameObjects.Image {
    constructor(aParams) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture);
        this.initVariables(aParams);
        this.initImage();
        this.initPhysics();
        this.scene.add.existing(this);
    }
    initVariables(aParams) {
        this.bulletSpeed = aParams.bulletProperties.speed;
    }
    initImage() {
        this.setOrigin(0.5, 0.5);
    }
    initPhysics() {
        this.scene.physics.world.enable(this);
        this.body.setVelocityY(this.bulletSpeed);
        this.body.setSize(1, 8);
    }
    update() {
        if (this.y < 0 || this.y > this.scene.sys.canvas.height) {
            this.destroy();
        }
    }
}
