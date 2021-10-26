export class HUDScene extends Phaser.Scene {
    constructor() {
        super('HUDScene');
    }
    init() {
        this.bitmapTexts = [];
    }
    create() {
        this.bitmapTexts.push(this.add.bitmapText(10, this.scene.systems.canvas.height - 20, 'font', `Lives: ${this.registry.get('lives')}`, 8));
        this.bitmapTexts.push(this.add.bitmapText(10, 10, 'font', `Points: ${this.registry.get('points')}`, 8));
        // Events
        const level = this.scene.get('GameScene');
        level.events.on('pointsChanged', this.updatePoints, this);
        level.events.on('livesChanged', this.updateLives, this);
    }
    updatePoints() {
        this.bitmapTexts[1].setText(`Points: ${this.registry.get('points')}`);
    }
    updateLives() {
        this.bitmapTexts[0].setText(`Lives: ${this.registry.get('lives')}`);
    }
}
