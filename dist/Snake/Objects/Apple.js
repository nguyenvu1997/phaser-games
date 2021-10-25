import { CONST } from "../Const.js";
export class Apple extends Phaser.GameObjects.Graphics {
    constructor(aParams) {
        super(aParams.scene, aParams.options);
        this.x = aParams.options.x;
        this.y = aParams.options.y;
        this.fillStyle(0x61e85b, 0.8);
        this.fillRect(CONST.FIELD_SIZE, CONST.FIELD_SIZE, CONST.FIELD_SIZE, CONST.FIELD_SIZE);
        this.scene.add.existing(this);
    }
    /**
     * Randomly generate new apple position on the field
     * @param _rndX [Random X Position]
     * @param _rndY [Random Y Position]
     */
    newApplePosition(_rndX, _rndY) {
        this.x = _rndX;
        this.y = _rndY;
    }
}
