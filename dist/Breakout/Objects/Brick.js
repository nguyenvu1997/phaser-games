export class Brick extends Phaser.GameObjects.Rectangle {
    constructor(aParams) {
        super(aParams.scene, aParams.x, aParams.y, aParams.width, aParams.height, aParams.fillColor, aParams.fillAlpha);
        this.initRectangle();
        this.initPhysics();
        this.scene.add.existing(this);
    }
    initRectangle() {
        this.setOrigin(0);
    }
    initPhysics() {
        this.scene.physics.world.enable(this);
        this.body.setImmovable(true);
    }
}
