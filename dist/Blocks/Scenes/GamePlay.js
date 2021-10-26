import { CONST } from '../Const.js';
import { Block } from '../Objects/Block.js';
import { Cursor } from '../Objects/Cursor.js';
export class GamePlay extends Phaser.Scene {
    constructor() {
        super('gameplay');
        this.currentLevelArray = [];
    }
    init() {
        let tempLevel = CONST.levels[CONST.currentLevel];
        this.currentLevelWidth = tempLevel.width;
        this.currentLevelHeight = tempLevel.height;
        for (let y = 0; y < this.currentLevelHeight; y++) {
            for (let x = 0; x < this.currentLevelWidth; x++) {
                let blockType = tempLevel.data[y][x];
                this.currentLevelArray.push(new Block({
                    scene: this,
                    x: x * CONST.tileSize,
                    y: y * CONST.tileSize,
                    texture: 'block',
                    type: blockType
                }));
            }
        }
        this.cursors = this.input.keyboard.createCursorKeys();
        this.actionKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursor = new Cursor({
            scene: this,
            x: CONST.levels[CONST.currentLevel].cursorStart[0] * CONST.tileSize,
            y: CONST.levels[CONST.currentLevel].cursorStart[1] * CONST.tileSize,
            texture: 'cursor',
            cursorStartPosition: CONST.levels[CONST.currentLevel].cursorStart
        });
    }
    update() {
        for (let y = this.currentLevelHeight - 1; y >= 0; y--) {
            for (let x = this.currentLevelWidth - 1; x >= 0; x--) {
                let block = this.currentLevelArray[this.getBlockIndex(x, y)];
                if (block.getDead()) {
                    block.update();
                }
                else {
                    let upperBlock;
                    if (y > 0) {
                        upperBlock = this.currentLevelArray[this.getBlockIndex(x, y - 1)];
                    }
                    else {
                        upperBlock = undefined;
                    }
                    if (block.getType() === 0 && upperBlock !== undefined) {
                        if (upperBlock.getType() > 1) {
                            this.swapTwoBlocks(this.getBlockIndex(x, y), this.getBlockIndex(x, y - 1));
                        }
                    }
                }
            }
        }
        this.checkMatches();
        this.handleInput();
    }
    handleInput() {
        let oldX = this.cursor.getX();
        let oldY = this.cursor.getY();
        let dx = 0;
        let dy = 0;
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            dx = 1;
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            dx = -1;
        }
        if (!this.cursor.isActivated()) {
            if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                dy = -1;
            }
            else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
                dy = 1;
            }
        }
        if (dx !== 0 || dy !== 0) {
            let newX = oldX + dx;
            let newY = oldY + dy;
            if (this.getBlockType(newX, newY) !== 1) {
                this.cursor.moveTo(newX, newY);
                if (this.cursor.isActivated()) {
                    this.swapTwoBlocks(this.getBlockIndex(oldX, oldY), this.getBlockIndex(newX, newY));
                    this.cursor.setActivated();
                }
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.actionKey)) {
            if (this.getBlockType(this.cursor.getX(), this.cursor.getY()) !== 0) {
                this.cursor.setActivated();
            }
        }
    }
    getBlock(x, y) {
        return this.currentLevelArray[y * this.currentLevelWidth + x];
    }
    getBlockIndex(x, y) {
        return y * this.currentLevelWidth + x;
    }
    getBlockType(x, y) {
        return this.currentLevelArray[y * this.currentLevelWidth + x].getType();
    }
    getBlockTypeById(id) {
        return this.currentLevelArray[id].getType();
    }
    swapTwoBlocks(blockId0, blockId1) {
        let type0 = this.getBlockTypeById(blockId0);
        let type1 = this.getBlockTypeById(blockId1);
        this.currentLevelArray[blockId0].setType(type1);
        this.currentLevelArray[blockId1].setType(type0);
    }
    checkMatches() {
        let matches = [];
        for (let y = 1; y < this.currentLevelHeight - 1; y++) {
            for (let x = 1; x < this.currentLevelWidth - 1; x++) {
                if (this.getBlockType(x, y) > 1) {
                    if (this.isSameTypeAroundMe(x, y)) {
                        matches.push(this.getBlockIndex(x, y));
                    }
                }
            }
        }
        for (let i = 0; i < matches.length; i++) {
            this.currentLevelArray[matches[i]].activateDead();
        }
    }
    isSameTypeAroundMe(x, y) {
        let me = this.getBlockType(x, y);
        let leftOfMe = this.getBlockType(x - 1, y);
        let rightOfMe = this.getBlockType(x + 1, y);
        let topOfMe = this.getBlockType(x, y - 1);
        let bottomOfMe = this.getBlockType(x, y + 1);
        if (me === leftOfMe ||
            me === rightOfMe ||
            me === topOfMe ||
            me === bottomOfMe) {
            return true;
        }
        return false;
    }
}
