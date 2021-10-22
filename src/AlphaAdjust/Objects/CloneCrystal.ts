export class CloneCrystal extends Phaser.GameObjects.Image {
    private increaseAlpha: boolean;
    tween: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);

        // Image
        this.setOrigin(0.5)
            .setScale(2)
            .setAlpha(1);

        // Variables
        this.increaseAlpha = false;

        // Animations
        this.tween = this.scene.tweens.add({
            targets: this,
            duration: 2000,
            alpha: { start: 1, from: 1, to: 0 },
            yoyo: true,
            repeat: -1,
        });

        this.scene.add.existing(this);
    }

    update(): void {
    }

}
