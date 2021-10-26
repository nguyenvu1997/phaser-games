export class MenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

    constructor() {
        super({
            key: 'MenuScene'
        });
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );
        this.startKey.isDown = false;
    }

    preload() {
        this.load.pack('preload', './assets/Tank/pack.json', 'preload');
        this.load.image('explosion02', "./assets/Particles Effects/Explosion/explosion02.png")
        this.load.image('blackSmoke00', "./assets/Particles Effects/Black smoke/blackSmoke00.png")

    }

    create(): void {
        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 120,
                this.sys.canvas.height / 2,
                'font',
                'PRESS S TO PLAY',
                30
            )
        );

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 120,
                this.sys.canvas.height / 2 - 100,
                'font',
                'TANK',
                100
            )
        );
    }

    update(): void {
        if (this.startKey.isDown) {
            this.scene.start('GameScene');
        }
    }
}
