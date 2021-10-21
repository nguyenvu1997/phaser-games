import { Coin } from "../Objects/Coin.js";
import { Player } from "../Objects/Player.js";
export class CRGamePlay extends Phaser.Scene {
    constructor() {
        super('crgameplay');
        console.log('crgameplay');
        this.collectedCoins = 0;
    }
    preload() {
        this.load.image('background', './assets/CoinRunner/images/background.png');
        this.load.image('player', './assets/CoinRunner/images/player.png');
        this.load.image('coin', './assets/CoinRunner/images/coin.png');
        this.load.atlas('flares', 'assets/Phaser/flares.png', 'assets/Phaser/flares.json');
    }
    create() {
        const width = this.game.config.width;
        const height = this.game.config.height;
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.background = this.add.image(0, 0, 'background');
        this.background.setOrigin(0, 0);
        this.coin = new Coin(this, Phaser.Math.RND.integerInRange(100, 700), Phaser.Math.RND.integerInRange(100, 500), 'coin');
        this.player = new Player(this, width / 2, height / 2, 'player');
        this.coinsCollectedText = this.add.text(width / 2, height - 50, this.collectedCoins + '', {
            fontFamily: 'Arial',
            fontSize: 38 + 'px',
            stroke: '#fff',
            strokeThickness: 6,
            color: '#000000'
        });
    }
    update() {
        this.player.update();
        this.coin.update();
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.coin.getBounds())) {
            this.updateCoinStatus();
        }
    }
    updateCoinStatus() {
        this.collectedCoins++;
        this.coinsCollectedText.setText(this.collectedCoins + '');
        this.coin.changePosition();
    }
}
