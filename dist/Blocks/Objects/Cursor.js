import { CONST } from '../Const.js';
export class Cursor extends Phaser.GameObjects.Image {
    constructor(aParams) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.cursorStartPosition);
        this.currentPosition = aParams.cursorStartPosition;
        this.initVariables();
        this.initImage();
        this.scene.add.existing(this);
    }
    initVariables() {
        this.activated = false;
    }
    initImage() {
        this.setOrigin(0, 0);
    }
    moveTo(x, y) {
        this.currentPosition = [x, y];
        this.setPosition(x * CONST.tileSize, y * CONST.tileSize);
    }
    getX() {
        return this.currentPosition[0];
    }
    getY() {
        return this.currentPosition[1];
    }
    isActivated() {
        return this.activated;
    }
    setActivated() {
        this.activated = !this.activated;
    }
}
