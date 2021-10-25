import { Enemy } from "../Objects/Enemy.js";
import { Obstacle } from "../Objects/Obstacle.js";
import { Player } from "../Objects/Player.js";
export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }
    init() { }
    create() {
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: 'levelMap' });
        this.tileset = this.map.addTilesetImage('tiles');
        this.layer = this.map.createLayer('tileLayer', this.tileset, 0, 0);
        this.layer.setCollisionByProperty({ collide: true });
        this.obstacles = this.add.group({
            /*classType: Obstacle,*/
            runChildUpdate: true
        });
        this.enemies = this.add.group({
        /*classType: Enemy*/
        });
        this.convertObjects();
        // collider layer and obstacles
        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.player, this.obstacles);
        // collider for bullets
        this.physics.add.collider(this.player.getBullets(), this.layer, this.bulletHitLayer, null, this);
        this.physics.add.collider(this.player.getBullets(), this.obstacles, this.bulletHitObstacles, null, this);
        this.enemies.children.each((enemy) => {
            this.physics.add.overlap(this.player.getBullets(), enemy, this.playerBulletHitEnemy, null, this);
            this.physics.add.overlap(enemy.getBullets(), this.player, this.enemyBulletHitPlayer, null);
            this.physics.add.collider(enemy.getBullets(), this.obstacles, this.bulletHitObstacles, null);
            this.physics.add.collider(enemy.getBullets(), this.layer, this.bulletHitLayer, null);
        }, this);
        this.cameras.main.startFollow(this.player);
    }
    update() {
        this.player.update();
        this.enemies.children.each((enemy) => {
            enemy.update();
            if (this.player.active && enemy.active) {
                var angle = Phaser.Math.Angle.Between(enemy.body.x, enemy.body.y, this.player.body.x, this.player.body.y);
                enemy.getBarrel().angle =
                    (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
            }
        }, this);
    }
    convertObjects() {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer('objects').objects;
        objects.forEach((object) => {
            if (object.type === 'player') {
                this.player = new Player({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankBlue'
                });
            }
            else if (object.type === 'enemy') {
                let enemy = new Enemy({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankRed'
                });
                this.enemies.add(enemy);
            }
            else {
                let obstacle = new Obstacle({
                    scene: this,
                    x: object.x,
                    y: object.y - 40,
                    texture: object.type
                });
                this.obstacles.add(obstacle);
            }
        });
    }
    bulletHitLayer(bullet) {
        bullet.destroy();
    }
    bulletHitObstacles(bullet, obstacle) {
        bullet.destroy();
    }
    enemyBulletHitPlayer(bullet, player) {
        bullet.destroy();
        player.updateHealth();
    }
    playerBulletHitEnemy(bullet, enemy) {
        bullet.destroy();
        enemy.updateHealth();
    }
}
