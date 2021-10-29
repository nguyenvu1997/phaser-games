import { Bullet } from "../Objects/Bullet.js";
import { Enemy } from "../Objects/Enemy.js";
import { Obstacle } from "../Objects/Obstacle.js";
import { Player } from "../Objects/Player.js";

import { CONST } from "../Const.js";


export class GameScene extends Phaser.Scene {
    private map: Phaser.Tilemaps.Tilemap;
    private tileset: Phaser.Tilemaps.Tileset;
    private layer: Phaser.Tilemaps.TilemapLayer;

    private player: Player;
    private enemies: Phaser.GameObjects.Group;
    private obstacles: Phaser.GameObjects.Group;
    private scoreText: Phaser.GameObjects.BitmapText;

    private target: Phaser.Math.Vector2;


    constructor() {
        super('GameScene');
    }

    init(): void {
        CONST.SCORE = 0
    }

    create(): void {
        // Load UI
        this.scene.run('game-ui')

        // Load Sounds
        this.sound.mute = false;

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

        // Create Objects
        this.convertObjects();

        // Player & Obstacles
        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.player, this.obstacles);

        // Bullets
        this.physics.add.collider(
            this.player.getBullets(),
            this.layer,
            this.bulletHitLayer,
            null,
            this
        );

        this.physics.add.collider(
            this.player.getBullets(),
            this.obstacles,
            this.bulletHitObstacles,
            null,
            this
        );

        this.enemies.children.each((enemy: Enemy) => {
            this.physics.add.overlap(
                this.player.getBullets(),
                enemy,
                this.playerBulletHitEnemy,
                null,
                this
            );
            this.physics.add.overlap(
                enemy.getBullets(),
                this.player,
                this.enemyBulletHitPlayer,
                null
            );

            this.physics.add.collider(
                enemy.getBullets(),
                this.obstacles,
                this.bulletHitObstacles,
                null
            );
            this.physics.add.collider(
                enemy.getBullets(),
                this.layer,
                this.bulletHitLayer,
                null
            );
        }, this);

        // Score
        // this.scoreText = this.add.text(300, -325, 'Score:', {
        //     color: 'black',
        //     fontSize: '40'
        // }).setScale(3);

        this.scoreText = this.add.bitmapText(800, 30, 'font2', "SCORE: " + CONST.SCORE)
            .setDepth(2)
            .setScrollFactor(0);

        // Camera
        this.cameras.main.startFollow(this.player);
    }

    update(): void {
        this.player.update();
        this.effects();

        this.enemies.children.each((enemy: Enemy) => {
            enemy.update();
            if (this.player.active && enemy.active) {
                var angle = Phaser.Math.Angle.Between(
                    enemy.body.x,
                    enemy.body.y,
                    this.player.body.x,
                    this.player.body.y
                );

                enemy.getBarrel().angle =
                    (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG;
            }
        }, this);
    }

    effects() {
        // Effects
        const { width, height } = this.game.config

        var particles = this.add.particles('explosion02');
        particles.createEmitter({
            speed: 10,
            blendMode: 'ADD',
            scale: { start: 0.05, end: 0 },
            on: false
        });
        particles.emitParticleAt(Phaser.Math.RND.between(20, width as number), Phaser.Math.RND.between(20, height as number), 5)
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer('objects').objects as any[];

        objects.forEach((object) => {
            if (object.type === 'player') {
                this.player = new Player({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankBlue'
                });
            } else if (object.type === 'enemy') {
                let enemy = new Enemy({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankRed'
                });

                this.enemies.add(enemy);
            } else {
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

    private bulletHitLayer(bullet: Bullet): void {
        bullet.endEffect();
        bullet.destroy();
    }

    private bulletHitObstacles(bullet: Bullet, obstacle: Obstacle): void {
        bullet.endEffect();
        bullet.destroy();
    }

    private enemyBulletHitPlayer(bullet: Bullet, player: Player): void {
        bullet.endEffect();
        bullet.destroy();
        player.updateHealth();
    }

    private playerBulletHitEnemy(bullet: Bullet, enemy: Enemy): void {
        bullet.endEffect();
        bullet.destroy();
        CONST.SCORE += 1;
        this.scoreText.setText("SCORE: " + CONST.SCORE);
        enemy.updateHealth();
    }
}
