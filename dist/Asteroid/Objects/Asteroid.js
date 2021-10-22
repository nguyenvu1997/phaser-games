import { CONST } from '../Const.js';
export class Asteroid extends Phaser.GameObjects.Graphics {
    constructor(aParams) {
        super(aParams.scene, aParams.options);
        // variables
        this.numberOfSides = 12;
        this.asteroidRadius = 0;
        this.sizeOfAsteroid = aParams.size;
        // init ship
        this.initAsteroid(aParams.options.x, aParams.options.y, this.sizeOfAsteroid);
        // physics
        this.scene.physics.world.enable(this);
        this.body.allowGravity = false;
        this.body.setCircle(this.asteroidRadius);
        this.body.setOffset(-this.asteroidRadius, -this.asteroidRadius);
        this.scene.tweens.add({
            targets: this,
            duration: 3000,
            angle: { from: 180, to: 90 },
            yoyo: true,
        });
        this.scene.add.existing(this);
    }
    getRadius() {
        return this.radius;
    }
    getBody() {
        return this.body;
    }
    initAsteroid(aX, aY, aSizeOfAsteroid) {
        let points = [];
        for (let i = 0; i < this.numberOfSides; i++) {
            switch (aSizeOfAsteroid) {
                case 3: {
                    this.radius = Phaser.Math.RND.between(CONST.ASTEROID.LARGE.MAXSIZE, CONST.ASTEROID.LARGE.MINSIZE);
                    this.velocity = this.getRandomVelocity(CONST.ASTEROID.LARGE.MINSPEED, CONST.ASTEROID.LARGE.MAXSPEED);
                    break;
                }
                case 2: {
                    this.radius = Phaser.Math.RND.between(CONST.ASTEROID.MEDIUM.MAXSIZE, CONST.ASTEROID.MEDIUM.MINSIZE);
                    this.velocity = this.getRandomVelocity(CONST.ASTEROID.MEDIUM.MINSPEED, CONST.ASTEROID.MEDIUM.MAXSPEED);
                    break;
                }
                case 1: {
                    this.radius = Phaser.Math.RND.between(CONST.ASTEROID.SMALL.MAXSIZE, CONST.ASTEROID.SMALL.MINSIZE);
                    this.velocity = this.getRandomVelocity(CONST.ASTEROID.SMALL.MINSPEED, CONST.ASTEROID.SMALL.MAXSPEED);
                    break;
                }
            }
            if (this.radius > this.asteroidRadius) {
                this.asteroidRadius = this.radius;
            }
            let x = this.radius * Math.cos((2 * Math.PI * i) / this.numberOfSides);
            let y = this.radius * Math.sin((2 * Math.PI * i) / this.numberOfSides);
            points.push(new Phaser.Math.Vector2(x, y));
        }
        this.lineStyle(1, 0xffffff);
        for (let p = 0; p < points.length; p++) {
            this.beginPath();
            this.moveTo(points[p].x, points[p].y);
            if (p + 1 < points.length) {
                this.lineTo(points[p + 1].x, points[p + 1].y);
            }
            else {
                this.lineTo(points[0].x, points[0].y);
            }
            this.strokePath();
        }
        this.x = aX;
        this.y = aY;
    }
    update() {
        this.applyForces();
        this.checkIfOffScreen();
    }
    applyForces() {
        // apple velocity to position
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        // rotate
        // this.rotation += 0.005;
    }
    getSize() {
        return this.sizeOfAsteroid;
    }
    checkIfOffScreen() {
        // horizontal check
        if (this.x > this.scene.sys.canvas.width + CONST.SHIP_SIZE) {
            this.x = -CONST.SHIP_SIZE;
        }
        else if (this.x < -CONST.SHIP_SIZE) {
            this.x = this.scene.sys.canvas.width + CONST.SHIP_SIZE;
        }
        // vertical check
        if (this.y > this.scene.sys.canvas.height + CONST.SHIP_SIZE) {
            this.y = -CONST.SHIP_SIZE;
        }
        else if (this.y < -CONST.SHIP_SIZE) {
            this.y = this.scene.sys.canvas.height + CONST.SHIP_SIZE;
        }
    }
    getRandomVelocity(aMin, aMax) {
        return new Phaser.Math.Vector2(Phaser.Math.RND.between(this.getRndNumber(aMin, aMax), this.getRndNumber(aMin, aMax)), Phaser.Math.RND.between(this.getRndNumber(aMin, aMax), this.getRndNumber(aMin, aMax)));
    }
    getRndNumber(aMin, aMax) {
        let num = Math.floor(Math.random() * aMax) + aMin;
        num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        return num;
    }
}
