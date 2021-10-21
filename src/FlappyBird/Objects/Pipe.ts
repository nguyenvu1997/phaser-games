export class Pipe extends Phaser.GameObjects.Image {
    scene: Phaser.Scene;
    body: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
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
