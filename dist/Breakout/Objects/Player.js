export class Player extends Phaser.GameObjects.Rectangle {
    constructor(aParams) {
        super(aParams.scene, aParams.x, aParams.y, aParams.width, aParams.height, aParams.fillColor, aParams.fillAlpha);
        this.initRectangle();
        this.initPhysics();
        this.initInput();
        this.scene.add.existing(this);
    }
    initRectangle() {
        this.setFillStyle(0x9697c6, 1);
    }
    initPhysics() {
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds();
        this.body.setDragX(300);
        this.body.setImmovable(true);
    }
    initInput() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
    update() {
        this.handleInput();
    }
    handleInput() {
        if (this.cursors.right.isDown) {
            this.body.setVelocityX(300);
        }
        else if (this.cursors.left.isDown) {
            this.body.setVelocityX(-300);
        }
    }
    resetToStartPosition() {
        this.x = +this.scene.game.config.width / 2 - 20;
        this.y = +this.scene.game.config.height - 50;
    }
}
