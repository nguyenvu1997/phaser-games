import { settings } from "../Const.js";
export class Clock extends Phaser.GameObjects.Sprite {
    constructor(aParams) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
        // Face Clock
        this.face = this.scene.add.sprite(aParams.x, aParams.y, aParams.prefix + 'clockface');
        this.face.setVisible(false);
        // Hand Clock
        this.hand = this.scene.add.sprite(aParams.x, aParams.y, aParams.prefix + 'hand');
        this.hand.setTint(0xff6378);
        this.hand.setDepth(2);
        this.hand.setRotation(Phaser.Math.Angle.Random());
        this.scene.physics.world.enable(this.hand);
        const handBody = this.hand.body;
        handBody.angularVelocity =
            Phaser.Math.RND.between(settings.LEVELS[settings.currentLevel].CLOCK_SPEED.MIN, settings.LEVELS[settings.currentLevel].CLOCK_SPEED.MAX) * Phaser.Math.RND.sign();
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }
    setActiveAppearance() {
        this.setDepth(1);
        this.setFrame(1);
        this.face.setDepth(2);
        this.face.setVisible(true);
        this.face.setTintFill(0xfff730);
        this.hand.setDepth(2);
        this.hand.setFrame(1);
        this.hand.setTintFill(0xfff730);
    }
    getCurrentHandRotation() {
        return this.hand.rotation;
    }
    kill() {
        this.face.destroy();
        this.hand.destroy();
        this.destroy();
    }
}
