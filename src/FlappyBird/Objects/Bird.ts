export class Bird extends Phaser.GameObjects.Image {
    scene: Phaser.Scene;
    body: Phaser.Physics.Arcade.Body;

    private jumpKey: Phaser.Input.Keyboard.Key;
    private isDead: boolean;
    private isFlapping: boolean;

    public getDead(): boolean {
        return this.isDead;
    }

    public setDead(dead: boolean): void {
        this.isDead = dead;
    }

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string) {
        super(scene, x, y, texture, frame);

        // Image
        this.setScale(3);
        this.setOrigin(0, 0);

        // Variables
        this.isDead = false;
        this.isFlapping = false;

        // Physics
        this.scene.physics.world.enable(this);
        this.body.setGravityY(1000);
        this.body.setSize(17, 12);

        // Input
        this.jumpKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.scene.add.existing(this);
    }

    update(): void {
        // Handle Angle Change
        if (this.angle < 30) {
            this.angle += 2;
        }

        // Handle Input
        if (this.jumpKey.isDown && !this.isFlapping) {
            this.isFlapping = true;
            this.body.setVelocityY(-350);
            this.scene.tweens.add({
                targets: this,
                props: { angle: -20 },
                duration: 150,
                ease: 'Power0'
            });
        } else if (this.jumpKey.isUp && this.isFlapping) {
            this.isFlapping = false;
        }

        // Check If Off The Screen
        if (this.y + this.height > this.scene.sys.canvas.height) {
            this.isDead = true;
        }
    }
}
