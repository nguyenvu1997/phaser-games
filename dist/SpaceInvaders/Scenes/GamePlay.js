import { Enemy } from "../Objects/Enemy.js";
import { Player } from "../Objects/Player.js";
export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }
    init() {
        this.enemies = this.add.group({ runChildUpdate: true });
    }
    create() {
        // Create Player
        this.player = new Player({
            scene: this,
            x: this.sys.canvas.width / 2,
            y: this.sys.canvas.height - 40,
            texture: 'player'
        });
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 10; x++) {
                let type;
                if (y === 0) {
                    type = 'squid';
                }
                else if (y === 1 || y === 2) {
                    type = 'crab';
                }
                else {
                    type = 'octopus';
                }
                this.enemies.add(new Enemy({ scene: this, x: 20 + x * 15, y: 50 + y * 15, texture: type }));
            }
        }
    }
    update() {
        if (this.player.active) {
            this.player.update();
            this.enemies.children.each((enemy) => {
                enemy.update();
                if (enemy.getBullets().getLength() > 0) {
                    this.physics.overlap(enemy.getBullets(), this.player, this.bulletHitPlayer, null, this);
                }
            }, this);
            this.checkCollisions();
        }
        if (this.registry.get('lives') < 0 || this.enemies.getLength() === 0) {
            this.scene.start('MenuScene');
            this.scene.stop('HUDScene');
        }
    }
    checkCollisions() {
        this.physics.overlap(this.player.getBullets(), this.enemies, this.bulletHitEnemy, null, this);
    }
    bulletHitEnemy(bullet, enemy) {
        bullet.destroy();
        enemy.gotHurt();
    }
    bulletHitPlayer(bullet, player) {
        bullet.destroy();
        player.gotHurt();
    }
}
