export class MainMenu extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];
    private circleGraphic: Phaser.GameObjects.Graphics;
    private circleGeom: Phaser.Geom.Circle;

    constructor() {
        super('mainmenu');
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    preload(): void {
        this.load.image('border', './assets/Blockade/images/border.png');
        this.load.spritesheet('player', './assets/Blockade/images/player.png', {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.bitmapFont('pcsenior', './assets/Blockade/font/pcsenior.png', './assets/Blockade/font/pcsenior.fnt');
    }

    create(): void {
        this.circleGraphic = this.add.graphics({
            x: 0,
            y: 0,
            fillStyle: { color: 0xff00ff, alpha: 1 }
        });

        this.circleGeom = new Phaser.Geom.Circle(152, 105, 8);
        this.circleGraphic.fillCircleShape(this.circleGeom);

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 28,
                this.sys.canvas.height / 2 - 10,
                'pcsenior',
                'PLAY SPACE',
                8
            )
        );

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 60,
                this.sys.canvas.height / 2 - 60,
                'pcsenior',
                'BLOCKADE',
                16
            )
        );
    }

    update(): void {
        if (this.startKey.isDown) {
            this.scene.start('gameplay');
        }
    }
}
