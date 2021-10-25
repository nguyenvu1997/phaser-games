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
        this.initRegistry();
    }
    create() {
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 65, this.sys.canvas.height / 2, 'font', 'PRESS S TO PLAY', 8));
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 60, this.sys.canvas.height / 2 - 40, 'font', 'SPACE INVADERS', 8));
    }
    update() {
        if (this.startKey.isDown) {
            this.scene.start('HUDScene');
            this.scene.start('GameScene');
            this.scene.bringToTop('HUDScene');
        }
    }
    /**
     * Build-in global game data manager to exchange data between scenes.
     * Here we initialize our variables with a key.
     */
    initRegistry() {
        this.registry.set('points', 0);
        this.registry.set('lives', 3);
        this.registry.set('level', 1);
    }
}
