export class PauseMenu {

    private container!: Phaser.GameObjects.Container;
    private checkmark!: Phaser.GameObjects.Image;
    private scene: Phaser.Scene;

    private isShow = false;

    getIsShow() {
        return this.isShow
    }

    constructor(scene: Phaser.Scene) {
        const { width, height } = scene.scale
        this.scene = scene

        this.container = scene.add.container(2000, 500)
        this.container.setDepth(10)

        const panel = scene.add.nineslice(0, 0, 200, 200, 'grey-panel', 24)
            .setOrigin(1, 0)

        let newGame = scene.add.text(-panel.width + 10, 70, 'New Game', {
            color: 'black',
            fontSize: '28'
        }).setScale(3);

        let continueGame = scene.add.text(-panel.width + 10, 130, 'Continue', {
            color: 'black',
            fontSize: '28'
        }).setScale(3);

        newGame.setInteractive().on('pointerup', function () {
            this.scene.scene.start('GameScene');
            this.hide();
        }, this)

        continueGame.setInteractive().on('pointerup', function () {
            this.scene.scene.resume('GameScene');
            this.hide();
        }, this)

        const soundButton = scene.add.image(-panel.width + 10, 8, 'small-button')
            .setOrigin(0, 0)

        this.checkmark = scene.add.image(soundButton.x + soundButton.width * 0.5, soundButton.y + soundButton.height * 0.5, 'checkmark')
        const text = scene.add.text(soundButton.x + soundButton.width + 10, soundButton.y, 'Sound', {
            color: 'black',
            fontSize: '28'
        }).setScale(3);

        this.container.add([panel, soundButton, this.checkmark, text, newGame, continueGame])
        this.container.setScrollFactor(0)

        // Add Event Sound Button
        soundButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                soundButton.setTint(0xe0e0e0)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                soundButton.setTint(0xffffff)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                soundButton.setTint(0xffffff)
                this.setSound()
            })
    }

    show() {
        if (this.isShow) {
            return
        }

        this.scene.tweens.add({
            targets: this.container,
            x: 1100,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.isShow = true
    }

    hide() {
        if (!this.isShow) {
            return
        }

        this.scene.tweens.add({
            targets: this.container,
            x: 2000,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.isShow = false
    }


    private setSound() {
        let isMute = !this.checkmark.visible

        isMute = !isMute

        this.scene.sound.mute = isMute

        this.checkmark.visible = !isMute
    }
}