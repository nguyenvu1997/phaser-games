export class Obstacle extends Phaser.GameObjects.Image {
    constructor(aParams) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture);
        this.initImage();
        this.scene.add.existing(this);
    }
    initImage() {
        this.setOrigin(0, 0);
        this.scene.physics.world.enable(this);
        this.body.setImmovable(true);
    }
    update() { }
}
