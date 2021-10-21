export class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }
    preload() {
        this.load.pack('preload', "./assets/FlappyBird/pack.json", 'preload');
    }
    update() {
        this.scene.start('mainmenu');
    }
}
