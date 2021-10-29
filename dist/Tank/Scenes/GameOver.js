import { CONST } from "../Const.js";
export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
        this.bitmapTexts = [];
    }
    init() {
        if (CONST.SCORE > CONST.HIGHSCORE) {
            CONST.HIGHSCORE = CONST.SCORE;
        }
    }
    create() {
        this.scene.stop('game-ui');
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 110, this.sys.canvas.height / 2, 'font2', 'SCORE:' + CONST.SCORE, 30));
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 200, this.sys.canvas.height / 2 - 100, 'font2', 'HIGHSCORE:' + CONST.HIGHSCORE, 50));
        let newGame = this.add.bitmapText(this.sys.canvas.width / 2 - 120, this.sys.canvas.height / 2 - 250, 'font2', 'NEW GAME', 50);
        newGame.setInteractive()
            .on('pointerup', function () {
            this.scene.start('GameScene');
        }, this);
    }
}
