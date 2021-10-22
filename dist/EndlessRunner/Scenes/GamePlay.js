export class GamePlay extends Phaser.Scene {
    constructor() {
        super('gameplay');
        this.settings = {
            BLOCK_WIDTH: 40,
            MAX_ACTIVE_TOWERS: 8,
            SPACING: { MAX: 8, MIN: 4 },
            SCROLLING_SPEED_X_AXIS: -200,
            TOWER_PROPERTIES: {
                COLOR: 0xffef24,
                HEIGHT: { MIN: 80, MAX: 350 }
            },
            createTowerXPosition: 0,
            highScore: 0,
            score: 0
        };
    }
    init() {
        this.isPlayerJumping = false;
        this.settings.createTowerXPosition = 0;
    }
    create() {
        const width = this.game.config.width;
        const height = this.game.config.height;
        this.loadingBar = this.add.rectangle(0, height - this.settings.BLOCK_WIDTH, 0, this.settings.BLOCK_WIDTH, 0xff2463)
            .setOrigin(0)
            .setDepth(2);
        this.loadingBarTween = this.tweens.add({
            targets: this.loadingBar,
            props: {
                width: {
                    value: this.game.canvas.width,
                    duration: 1000,
                    ease: 'Power0'
                }
            },
            yoyo: true,
            repeat: -1
        }).pause();
        this.towers = this.add.group();
        for (let i = 0; i < this.settings.MAX_ACTIVE_TOWERS; i++) {
            this.spawnNewTower();
            if (i == 0) {
                this.player = this.add.rectangle(this.settings.createTowerXPosition, 0, this.settings.BLOCK_WIDTH, this.settings.BLOCK_WIDTH, 0xff2463)
                    .setOrigin(0);
                this.physics.world.enable(this.player);
            }
        }
        // Collisions
        this.physics.add.collider(this.player, this.towers, this.playerTowerCollision, null, this);
        // Setup Input
        this.input.on('pointerdown', () => {
            if (!this.isPlayerJumping) {
                this.loadingBarTween.restart();
            }
        }, this);
        this.input.on('pointerup', this.playerJump, this);
        // Camera
        this.cameras.main.setBounds(0, 0, width, height);
        this.cameras.main.startFollow(this.player);
    }
    update() {
        this.towers.getChildren().forEach((tower) => {
            const towerBody = tower.body;
            if (this.isPlayerJumping) {
                towerBody.setVelocityX(this.settings.SCROLLING_SPEED_X_AXIS);
            }
            else {
                towerBody.setVelocityX(0);
            }
            if (towerBody.position.x < 0) {
                this.spawnNewTower();
                tower.destroy();
            }
        }, this);
        if (this.player.y > this.game.config.height) {
            this.scene.start('gameplay');
        }
    }
    spawnNewTower() {
        const spacingBeforeTower = Phaser.Math.RND.between(this.settings.SPACING.MIN, this.settings.SPACING.MAX);
        this.settings.createTowerXPosition += spacingBeforeTower * this.settings.BLOCK_WIDTH;
        const towerHeight = Phaser.Math.RND.between(this.settings.TOWER_PROPERTIES.HEIGHT.MIN, this.settings.TOWER_PROPERTIES.HEIGHT.MAX);
        const newTower = this.add
            .rectangle(this.settings.createTowerXPosition, +this.game.config.height - towerHeight, this.settings.BLOCK_WIDTH, towerHeight, this.settings.TOWER_PROPERTIES.COLOR)
            .setOrigin(0);
        this.physics.world.enable(newTower);
        const towerBody = newTower.body;
        towerBody.setImmovable(true);
        towerBody.setAllowGravity(false);
        this.towers.add(newTower);
    }
    playerJump() {
        if (!this.isPlayerJumping) {
            const playerBody = this.player.body;
            playerBody.setVelocityY(-this.loadingBar.width);
            this.isPlayerJumping = true;
            this.loadingBarTween.stop();
            this.loadingBar.width = 0;
        }
    }
    playerTowerCollision(player, tower) {
        if (tower.body.touching.up) {
            player.body.setVelocity(0);
            this.isPlayerJumping = false;
        }
    }
}
