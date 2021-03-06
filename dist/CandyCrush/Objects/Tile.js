export class Tile extends Phaser.GameObjects.Image {
    constructor(aParams) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
        this.setOrigin(0, 0);
        this.setInteractive();
        this.scene.add.existing(this);
    }
}
