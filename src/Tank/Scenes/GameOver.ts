import { CONST } from "../Const.js";


export class GameOver extends Phaser.Scene {
    private scoreText: Phaser.GameObjects.BitmapText;
    private highScoreText: Phaser.GameObjects.BitmapText;


    constructor() {
        super('GameOverScene');
    }

    init(): void {
        if (CONST.SCORE > CONST.HIGHSCORE) {
            CONST.HIGHSCORE = CONST.SCORE;
        }

    }

    create() {
        this.scene.stop('game-ui')

        this.scoreText = this.add.bitmapText(
            this.sys.canvas.width / 2 - 110,
            0,
            'font2',
            'SCORE:' + CONST.SCORE,
            30
        )

        this.tweens.add({
            targets: this.scoreText,
            y: 700,
            duration: 1000,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.highScoreText = this.add.bitmapText(
            this.sys.canvas.width / 2 - 200,
            0,
            'font2',
            'HIGHSCORE:' + CONST.HIGHSCORE,
            50
        )

        this.tweens.add({
            targets: this.highScoreText,
            y: 550,
            duration: 1000,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        let newGame = this.add.bitmapText(this.sys.canvas.width / 2 - 120, 0, 'font2', 'NEW GAME', 50)

        this.tweens.add({
            targets: newGame,
            y: 400,
            duration: 1000,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        newGame.setInteractive()
            .on('pointerup', function () {
                this.scene.start('GameScene');
            }, this)
    }
}