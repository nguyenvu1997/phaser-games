import { Bullet } from "./Bullet.js";
export class Player extends Phaser.GameObjects.Image {
    constructor(aParams) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture);
        // Image
        this.setOrigin(0.5, 0.5);
        this.initVariables();
        this.initInput();
        // Physics
        this.scene.physics.world.enable(this);
        this.body.setSize(13, 8);
        this.scene.add.existing(this);
    }
    getBullets() {
        return this.bullets;
    }
    initVariables() {
        this.bullets = this.scene.add.group({
            runChildUpdate: true
        });
        this.lastShoot = 0;
        this.flyingSpeed = 100;
    }
    initInput() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.shootingKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        this.handleFlying();
        this.handleShooting();
    }
    handleFlying() {
        if (this.cursors.right.isDown &&
            this.x < this.scene.sys.canvas.width - this.width / 2) {
            this.body.setVelocityX(this.flyingSpeed);
        }
        else if (this.cursors.left.isDown && this.x > this.width / 2) {
            this.body.setVelocityX(-this.flyingSpeed);
        }
        else {
            this.body.setVelocityX(0);
        }
    }
    handleShooting() {
        if (this.shootingKey.isDown && this.scene.time.now > this.lastShoot) {
            if (this.bullets.getLength() < 1) {
                this.bullets.add(new Bullet({
                    scene: this.scene,
                    bulletProperties: {
                        speed: -300
                    },
                    x: this.x,
                    y: this.y - this.height,
                    texture: 'bullet'
                }));
                this.lastShoot = this.scene.time.now + 500;
            }
        }
    }
    gotHurt() {
        // Update Lives
        let currentLives = this.scene.registry.get('lives');
        this.scene.registry.set('lives', currentLives - 1);
        this.scene.events.emit('livesChanged');
        // Effects
        var particles = this.scene.add.particles('explosion00');
        particles.createEmitter({
            speed: 50,
            blendMode: 'ADD',
            scale: { start: 0.05, end: 0 },
            on: false
        });
        particles.emitParticleAt(this.x, this.y, 5);
        // Dead Animation
        this.scene.tweens.add({
            targets: this,
            alpha: { from: 0, to: 1 },
            duration: 500,
            loop: 3
        });
        // Reset Position
        this.x = this.scene.sys.canvas.width / 2;
        this.y = this.scene.sys.canvas.height - 40;
    }
}
