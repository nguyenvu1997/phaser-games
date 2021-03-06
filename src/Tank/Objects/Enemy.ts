import { IImageConstructor } from "../Interfaces.js";
import { Bullet } from "./Bullet.js";

export class Enemy extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body;

    // Variables
    private health: number;
    private lastShoot: number;
    private speed: number;

    // Children
    private barrel: Phaser.GameObjects.Image;
    private lifeBar: Phaser.GameObjects.Graphics;

    // Game Objects
    private bullets: Phaser.GameObjects.Group;
    private tankShoot: Phaser.Sound.BaseSound;

    public getBarrel(): Phaser.GameObjects.Image {
        return this.barrel;
    }

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets;
    }

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

        this.tankShoot = this.scene.sound.add('tank-shoot', { volume: 0.1 });

        this.initContainer();
        this.scene.add.existing(this);
    }

    private initContainer() {
        // Variables
        this.health = 1;
        this.lastShoot = 0;
        this.speed = 100;

        // Image
        this.setDepth(0);

        this.barrel = this.scene.add.image(0, 0, 'barrelRed');
        this.barrel.setOrigin(0.5, 1);
        this.barrel.setDepth(1);

        this.lifeBar = this.scene.add.graphics();
        this.redrawLifebar();

        // Game Objects
        this.bullets = this.scene.add.group({
            /*classType: Bullet,*/
            active: true,
            maxSize: 10,
            runChildUpdate: true
        });

        // Tweens
        this.scene.tweens.add({
            targets: this,
            props: { y: this.y - 200 },
            delay: 0,
            duration: 2000,
            ease: 'Linear',
            easeParams: null,
            hold: 0,
            repeat: -1,
            repeatDelay: 0,
            yoyo: true
        });

        // Physics
        this.scene.physics.world.enable(this);
    }

    update(): void {
        if (this.active) {
            this.barrel.x = this.x;
            this.barrel.y = this.y;
            this.lifeBar.x = this.x;
            this.lifeBar.y = this.y;
            this.handleShooting();
        } else {
            this.destroy();
            this.barrel.destroy();
            this.lifeBar.destroy();
        }
    }

    private handleShooting(): void {
        if (this.scene.time.now > this.lastShoot) {
            if (this.bullets.getLength() < 10) {
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        rotation: this.barrel.rotation,
                        x: this.barrel.x,
                        y: this.barrel.y,
                        texture: 'bulletRed'
                    })
                );
                this.tankShoot.play();
                this.lastShoot = this.scene.time.now + 1000;
            }
        }
    }

    private redrawLifebar(): void {
        this.lifeBar.clear();
        this.lifeBar.fillStyle(0xe66a28, 1);
        this.lifeBar.fillRect(
            -this.width / 2,
            this.height / 2,
            this.width * this.health,
            15
        );
        this.lifeBar.lineStyle(2, 0xffffff);
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15);
        this.lifeBar.setDepth(1);
    }

    public updateHealth(): void {
        if (this.health > 0) {
            this.health -= 0.05;
            this.redrawLifebar();
        } else {
            this.health = 0;
            this.active = false;
        }
    }
}
