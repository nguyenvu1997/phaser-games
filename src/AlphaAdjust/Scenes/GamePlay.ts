import { CloneCrystal } from "../Objects/CloneCrystal.js";
import { OriginalCrystal } from "../Objects/OriginalCrystal.js";

export class GamePlay extends Phaser.Scene {
    private cloneCrystal: CloneCrystal;
    private originalCrystal: OriginalCrystal;
    private playerHasClicked: boolean;
    private feedbackText: Phaser.GameObjects.Text;
    private alphaDifference: number;

    constructor() {
        super('gameplay')
        console.log('Alpha Adjust')
    }

    init(): void {
        this.playerHasClicked = false;
        this.alphaDifference = -1;
    }

    preload(): void {
        this.load.image('crystal', './assets/AlphaAdjust/images/crystal.png');
    }

    create(): void {
        const width = this.game.config.width as number;
        const height = this.game.config.height as number;

        this.cloneCrystal = new CloneCrystal(this, width / 2 - 150, height / 2, 'crystal');
        this.originalCrystal = new OriginalCrystal(this, width / 2 + 150, height / 2, 'crystal');

        this.feedbackText = this.add.text(width / 2 - 150, height / 2 - 250, '', {
            align: 'center',
            fontFamily: 'Arial',
            fontSize: 50 + 'px',
            stroke: '#000000',
            strokeThickness: 8,
            color: '#ffffff'
        });

        this.input.on('pointerdown', function () {
            if (!this.playerHasClicked) {
                this.playerHasClicked = true;
                this.cloneCrystal.tween.stop();
                this.alphaDifference = (Math.abs(this.cloneCrystal.alpha - this.originalCrystal.alpha))
                if (this.alphaDifference >= 0.5) {
                    this.feedbackText.text = 'You can do better!';
                } else if (this.alphaDifference < 0.5 && this.alphaDifference >= 0.3) {
                    this.feedbackText.text = 'Ok';
                } else if (this.alphaDifference < 0.3 && this.alphaDifference >= 0.1) {
                    this.feedbackText.text = 'Great!';
                } else if (this.alphaDifference < 0.1) {
                    this.feedbackText.text = 'Wonderful!';
                }
            } else {
                this.scene.start('gameplay');
            }
        }, this);
    }

    update(): void {
        if (!this.playerHasClicked) {
            this.cloneCrystal.update();
        } else {
            this.add.text(
                this.sys.canvas.width / 2 - 100,
                this.sys.canvas.height / 2 + 100,
                this.alphaDifference.toFixed(2) + '',
                {
                    fontFamily: 'Arial',
                    fontSize: 100 + 'px',
                    stroke: '#000000',
                    strokeThickness: 8,
                    color: '#ffffff'
                }
            );
        }
    }
}