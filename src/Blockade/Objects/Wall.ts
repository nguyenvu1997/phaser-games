export class Wall extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);

        // Images
        this.setOrigin(0.5, 0.5);

        // Animations
        let tween = this.scene.tweens.add({
            targets: this,
            alpha: { from: 0.5, to: 1 },
            repeat: -1,
            yoyo: true,
            duration: 1000,
        })

        this.scene.add.existing(this);
    }

    update(): void {

    }
}