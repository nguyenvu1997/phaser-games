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
        this.load.image('explosion02', "./assets/Particles Effects/Explosion/explosion02.png");
        this.load.image('blackSmoke00', "./assets/Particles Effects/Black smoke/blackSmoke00.png");
        // Load Font
        this.load.bitmapFont('font2', './assets/FlappyBird/font/font.png', './assets/FlappyBird/font/font.fnt');
        // Load Sounds
        this.load.audio("tank-shoot", "./assets/Sounds/tank-shoot.wav");
        this.load.audio("hit-shoot", "./assets/Sounds/hit-shoot.mp3");
        // Load UI
        this.load.image('grey-panel', "./assets/UI/grey_panel.png");
        this.load.image('small-button', "./assets/UI/grey_box.png");
        this.load.image('checkmark', "./assets/UI/blue_checkmark.png");
        // Load Icon
        this.load.image('pause-game', "./assets/Icons/pause.png");
    }
    create() {
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 120, this.sys.canvas.height / 2, 'font', 'PRESS S TO PLAY', 30));
        this.bitmapTexts.push(this.add.bitmapText(this.sys.canvas.width / 2 - 120, this.sys.canvas.height / 2 - 100, 'font', 'TANK', 100));
        this.scene.start('GameScene');
    }
    update() {
    }
}
