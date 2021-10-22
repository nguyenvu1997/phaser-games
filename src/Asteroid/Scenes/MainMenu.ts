import { CONST } from '../Const.js';

export class MainMenu extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = [];

    constructor() {
        super('mainmenu');
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        // reset score, highscore and player lives
        if (CONST.SCORE > CONST.HIGHSCORE) {
            CONST.HIGHSCORE = CONST.SCORE;
        }
        CONST.SCORE = 0;
        CONST.LIVES = 3;
    }

    preload(): void {
        this.load.bitmapFont(
            'asteroidFont',
            './assets/Asteroid/font/asteroidFont.png',
            './assets/Asteroid/font/asteroidFont.fnt'
        );
    }

    create(): void {
        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 150,
                this.sys.canvas.height / 2 + 40,
                'asteroidFont',
                'PRESS SPACE TO PLAY',
                45
            )
        );

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 150,
                this.sys.canvas.height / 2 - 60,
                'asteroidFont',
                'A S T E R O I D',
                80
            )
        );

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 150,
                this.sys.canvas.height / 2 + 80,
                'asteroidFont',
                'HIGHSCORE: ' + CONST.HIGHSCORE,
                45
            )
        );
    }

    update(): void {
        if (this.startKey.isDown) {
            this.scene.start('gameplay');
        }
    }
}
