export class PauseMenu {

    private container!: Phaser.GameObjects.Container;
    private checkmark!: Phaser.GameObjects.Image;
    private soundButton!: Phaser.GameObjects.Image;
    private scene: Phaser.Scene;
    private text: Phaser.GameObjects.Text;
    private newGame: Phaser.GameObjects.Text;
    private continueGame: Phaser.GameObjects.Text;

    private isShow = false;

    getIsShow() {
        return this.isShow
    }

    constructor(scene: Phaser.Scene) {
        const { width, height } = scene.scale
        this.scene = scene

        this.container = scene.add.container(2000, 500)
        this.container.setDepth(10)

        const panel = scene.add.nineslice(0, 0, 300, 300, 'grey-panel', 24)
            .setOrigin(1, 0)

        this.newGame = scene.add.text(-panel.width + 50, 115, 'New Game', {
            color: 'black',
            fontSize: '32'
        }).setScale(3);

        this.continueGame = scene.add.text(-panel.width + 50, 195, 'Continue', {
            color: 'black',
            fontSize: '32'
        }).setScale(3);

        this.newGame.setInteractive().on('pointerup', function () {
            this.scene.scene.start('GameScene');
            this.hide();
        }, this)

        this.continueGame.setInteractive().on('pointerup', function () {
            this.scene.scene.resume('GameScene');
            this.hide();
        }, this)

        this.soundButton = scene.add.image(-panel.width + 50, 28, 'small-button')
            .setOrigin(0, 0)

        this.checkmark = scene.add.image(this.soundButton.x + this.soundButton.width * 0.5, this.soundButton.y + this.soundButton.height * 0.5, 'checkmark')
        this.text = scene.add.text(this.soundButton.x + this.soundButton.width + 10, this.soundButton.y, 'Sound', {
            color: 'black',
            fontSize: '32'
        }).setScale(3);

        this.container.add([panel, this.soundButton, this.checkmark, this.text, this.newGame, this.continueGame])
        this.container.setScrollFactor(0)

        // Add Event Sound Button
        this.soundButton.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.soundButton.setTint(0xe0e0e0)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
                this.soundButton.setTint(0xffffff)
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                this.soundButton.setTint(0xffffff)
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

        this.scene.tweens.add({
            targets: [this.newGame, this.continueGame, this.soundButton],
            x: -250,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.scene.tweens.add({
            targets: this.checkmark,
            x: -230,
            duration: 300,
            ease: Phaser.Math.Easing.Sine.InOut
        })

        this.scene.tweens.add({
            targets: this.text,
            x: -200,
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

        this.scene.tweens.add({
            targets: [this.newGame, this.continueGame, , this.soundButton, this.checkmark, this.text],
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