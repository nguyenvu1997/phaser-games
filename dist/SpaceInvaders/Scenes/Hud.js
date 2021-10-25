export class HUDScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'HUDScene'
        });
    }
    init() {
        this.bitmapTexts = [];
    }
    create() {
        // create bitmap texts
        this.bitmapTexts.push(this.add.bitmapText(10, this.scene.systems.canvas.height - 20, 'font', `Lives: ${this.registry.get('lives')}`, 8));
        this.bitmapTexts.push(this.add.bitmapText(10, 10, 'font', `Points: ${this.registry.get('points')}`, 8));
        // create events
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
