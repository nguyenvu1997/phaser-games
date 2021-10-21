export class Pipe extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        // Image
        this.setScale(3);
        this.setOrigin(0, 0);
        // Physics
        this.scene.physics.world.enable(this);
        this.body.allowGravity = false;
        this.body.setVelocityX(-200);
        this.body.setSize(20, 20);
        this.scene.add.existing(this);
    }
}
