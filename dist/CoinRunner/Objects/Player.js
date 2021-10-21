export class Player extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // Image
        this.setOrigin(0.5, 0.5);
        // Variables
        this.walkingSpeed = 5;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        var particles = this.scene.add.particles('flares');
        particles.createEmitter({
            frame: 'white',
            x: this.x,
            y: this.y,
            speedX: 100,
            tint: [0xffff00, 0xff0000, 0x00ff00, 0x0000ff],
            lifespan: 500,
            frequency: 50,
            blendMode: 'ADD',
            follow: this,
            scale: 0.2
        });
        this.scene.add.existing(this);
    }
    update() {
        this.handleInput();
    }
    handleInput() {
        if (this.cursors.right.isDown) {
            this.x += this.walkingSpeed;
            this.setFlipX(false);
        }
        else if (this.cursors.left.isDown) {
            this.x -= this.walkingSpeed;
            this.setFlipX(true);
        }
        else if (this.cursors.up.isDown) {
            this.y -= this.walkingSpeed;
        }
        else if (this.cursors.down.isDown) {
            this.y += this.walkingSpeed;
        }
    }
}
