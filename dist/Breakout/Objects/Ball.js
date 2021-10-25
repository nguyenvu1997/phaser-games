export class Ball extends Phaser.GameObjects.Rectangle {
    constructor(aParams) {
        super(aParams.scene, aParams.x, aParams.y, aParams.width, aParams.height, aParams.fillColor, aParams.fillAlpha);
        this.initRectangle();
        this.initPhysics();
        this.scene.add.existing(this);
    }
    initRectangle() {
        this.setOrigin(0);
        this.width = 10;
        this.height = 10;
        this.setFillStyle(0xffffff);
    }
    initPhysics() {
        this.scene.physics.world.enable(this);
        this.body.setBounce(1, 1);
        this.body.setCollideWorldBounds();
    }
    applyInitVelocity() {
        this.body.setVelocity(Phaser.Math.RND.between(-200, 200), 200);
        this.body.speed = 800;
    }
}
