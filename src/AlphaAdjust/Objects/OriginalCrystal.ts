export class OriginalCrystal extends Phaser.GameObjects.Image {
    private randomAlpha: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);

        // Variable
        this.randomAlpha = Phaser.Math.RND.realInRange(0, 1)

        // Image
        this.setOrigin(0.5)
            .setScale(2)
            .setAlpha(this.randomAlpha);

        this.scene.add.existing(this);
    }
}
