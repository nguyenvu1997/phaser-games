export class Wall extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // Images
        this.setOrigin(0.5, 0.5);
        this.setAlpha(Phaser.Math.RND.between(0.01, 0.4));
        this.scene.add.existing(this);
    }
    update() {
        if (this.alpha < 1) {
            this.setAlpha(this.alpha + 0.005);
        }
        else {
            this.setAlpha(1);
        }
    }
}
