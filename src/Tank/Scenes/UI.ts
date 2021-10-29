import { PauseMenu } from "./PauseMenu.js";

export class UI extends Phaser.Scene {
    private startGame = false;

    constructor() {
        super('game-ui')

    }

    create() {
        // Pause Menu
        let pauseIcon = this.add.image(50, 50, 'pause-game').setScrollFactor(0);




        let pauseMenu = new PauseMenu(this)

        pauseIcon.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
                pauseIcon.setTint(0xdedede)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                pauseIcon.setTint(0xffffff)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                pauseIcon.setTint(0x8afbff)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                pauseIcon.setTint(0xffffff);

                if (pauseMenu.getIsShow()) {
                    pauseMenu.hide();
                    this.scene.resume('GameScene')
                } else {
                    pauseMenu.show();
                    this.scene.pause('GameScene')
                }
            })

        if (this.startGame == false) {
            setTimeout(() => {
                this.scene.pause('GameScene')
            }, 10);
            pauseMenu.show();
            this.startGame = true;
        }
    }

}