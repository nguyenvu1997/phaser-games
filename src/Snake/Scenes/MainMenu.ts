import { CONST } from "../Const.js";

export class MainMenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

    constructor() {
        super('mainmenu');
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.S
        );

        if (CONST.SCORE > CONST.HIGHSCORE) {
            CONST.HIGHSCORE = CONST.SCORE;
        }
        CONST.SCORE = 0;
    }

    preload(): void {
        this.load.bitmapFont(
            'snakeFont',
            './assets/Snake/font/snakeFont.png',
            './assets/Snake/font/snakeFont.fnt'
        );
        this.load.atlas('flares', 'assets/Phaser/flares.png', 'assets/Phaser/flares.json');
    }

    create(): void {
        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 28,
                this.sys.canvas.height / 2 - 10,
                'snakeFont',
                'S: PLAY',
                8
            )
        );

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 70,
                this.sys.canvas.height / 2 - 60,
                'snakeFont',
                'S N A K E',
                16
            )
        );

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 45,
                this.sys.canvas.height / 2 + 30,
                'snakeFont',
                'HIGHSCORE: ' + CONST.HIGHSCORE,
                8
            )
        );
    }

    update(): void {
        if (this.startKey.isDown) {
            this.scene.start('gameplay');
        }
    }
}
