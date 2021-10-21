export class MainMenu extends Phaser.Scene {
    constructor() {
        super('mainmenu');
        console.log('mainmenu');
    }
    init() {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.startKey.isDown = false;
    }
    create() {
        this.titleBitmapText = this.add.bitmapText(0, 200, 'font', 'FLAPPY BIRD', 30);
        this.titleBitmapText.x = (195 - this.titleBitmapText.width / 2);
        this.playBitmapText = this.add.bitmapText(0, 300, 'font', 'SPACE: PLAY', 25);
        this.playBitmapText.x = (195 - this.playBitmapText.width / 2);
    }
    update() {
        if (this.startKey.isDown) {
            this.scene.start('gameplay');
        }
    }
}
