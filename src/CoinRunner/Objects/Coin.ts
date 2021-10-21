export class Coin extends Phaser.GameObjects.Image {
    private centerOfScreen: number;
    private changePositionTimer: Phaser.Time.TimerEvent;
    private lastPosition: string;
    tween: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
        super(scene, x, y, texture, frame);

        // Image
        this.setOrigin(0.5, 0.5);

        // Variables
        this.centerOfScreen = this.scene.sys.canvas.width / 2;
        this.changePositionTimer = null;
        this.setFieldSide();

        this.changePositionTimer = this.scene.time.addEvent({
            delay: 2000,
            callback: this.changePosition,
            callbackScope: this,
            loop: true
        });

        // Animations
        this.tween = this.scene.tweens.add({
            targets: this,
            duration: 2000,
            alpha: { start: 1, from: 1, to: 0 },
            repeat: -1,
            callbackScope: this.tween,
            loop: -1
        });

        this.scene.add.existing(this);
    }

    public changePosition(): void {
        this.setNewPosition();
        this.setFieldSide();
        this.tween.restart();
        this.changePositionTimer.reset({
            delay: 2000,
            callback: this.changePosition,
            callbackScope: this,
            loop: true
        });
    }

    private setNewPosition(): void {
        if (this.lastPosition == 'right') {
            this.x = Phaser.Math.RND.integerInRange(100, this.centerOfScreen);
        } else {
            this.x = Phaser.Math.RND.integerInRange(385, 700);
        }
        this.y = Phaser.Math.RND.integerInRange(100, 500);
    }

    private setFieldSide(): void {
        if (this.x <= this.centerOfScreen) {
            this.lastPosition = 'left';
        } else {
            this.lastPosition = 'right';
        }
    }

    update(): void {

    }
}
