export class Preload extends Phaser.Scene {

    constructor() {
        super("preload")
    }

    preload() {
        this.load.pack('preload', "./assets/FlappyBird/pack.json", 'preload')
        this.load.image('flame1', "./assets/Phaser/flame1.png")
        this.load.image('flame2', "./assets/Phaser/flame1.png")
    }

    update() {
        this.scene.start('mainmenu')
    }
}