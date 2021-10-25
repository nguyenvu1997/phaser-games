export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MenuScene'
        });
        this.bitmapTexts = [];
    }
    init() {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.startKey.isDown = false;
    }
    preload() {
        this.load.pack('preload', './assets/Tank/pack.json', 'preload');
    }
    create() {
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 120, this.sys.canvas.height / 2, 'font', 'PRESS S TO PLAY', 30));
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 120, this.sys.canvas.height / 2 - 100, 'font', 'TANK', 100));
    }
    update() {
        if (this.startKey.isDown) {
            this.scene.start('GameScene');
        }
    }
}
