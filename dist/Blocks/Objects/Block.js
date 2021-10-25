export class Block extends Phaser.GameObjects.Sprite {
    constructor(aParams) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.type);
        this.blockType = aParams.type;
        this.isDying = false;
        this.initSprite();
        this.scene.add.existing(this);
    }
    update() {
        if (this.isDying) {
            this.alpha -= 0.02;
            if (this.alpha === 0) {
                this.isDying = false;
                this.setType(0);
                this.setAlpha(1);
            }
        }
    }
    initSprite() {
        this.setFrame(this.blockType);
        this.setOrigin(0, 0);
    }
    getType() {
        return this.blockType;
    }
    setType(id) {
        this.blockType = id;
        this.setFrame(this.blockType);
    }
    activateDead() {
        this.isDying = true;
    }
    getDead() {
        return this.isDying;
    }
}
