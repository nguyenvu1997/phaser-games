import { Bullet } from "../Objects/Bullet.js";
import { Enemy } from "../Objects/Enemy.js";
import { Player } from "../Objects/Player.js";

export class GameScene extends Phaser.Scene {
    private enemies: Phaser.GameObjects.Group;
    private player: Player;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    init(): void {
        this.enemies = this.add.group({ runChildUpdate: true });
    }

    create(): void {
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
                } else if (y === 1 || y === 2) {
                    type = 'crab';
                } else {
                    type = 'octopus';
                }
                this.enemies.add(
                    new Enemy({ scene: this, x: 20 + x * 15, y: 50 + y * 15, texture: type })
                );
            }
        }
    }

    update(): void {
        if (this.player.active) {
            this.player.update();

            this.enemies.children.each((enemy: Enemy) => {
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

    private checkCollisions(): void {
        this.physics.overlap(
            this.player.getBullets(),
            this.enemies,
            this.bulletHitEnemy,
            null,
            this
        );
    }

    private bulletHitEnemy(bullet: Bullet, enemy: Enemy): void {
        bullet.destroy();
        enemy.gotHurt();
    }

    private bulletHitPlayer(bullet: Bullet, player: Player): void {
        bullet.destroy();
        player.gotHurt();
    }
}
