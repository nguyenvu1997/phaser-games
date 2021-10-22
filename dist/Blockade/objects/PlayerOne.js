export class PlayerOne {
    constructor(scene, _x, _y, _direction) {
        this.snakeBody = [];
        this.movingSpeed = 8;
        this.scene = scene;
        this.snakeHead = this.scene.add
            .image(_x, _y, 'player')
            .setOrigin(0.5, 0.5)
            .setFrame(3);
        // Varibles
        this.direction = _direction;
        this.currentFrame = 1;
        this.flipX = false;
        this.flipY = false;
        // Input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
    setDead(_dead) {
        this.dead = _dead;
    }
    isDead() {
        return this.dead;
    }
    getHead() {
        return this.snakeHead;
    }
    getBody() {
        return this.snakeBody;
    }
    move() {
        this.lastPositionX = this.snakeHead.x;
        this.lastPositionY = this.snakeHead.y;
        if (this.direction === 'left') {
            this.snakeHead.x -= this.movingSpeed;
            this.snakeHead.setFlipX(true);
            this.snakeHead.setAngle(0);
        }
        else if (this.direction === 'right') {
            this.snakeHead.x += this.movingSpeed;
            this.snakeHead.setFlipX(false);
            this.snakeHead.setAngle(0);
        }
        else if (this.direction === 'up') {
            this.snakeHead.y -= this.movingSpeed;
            this.snakeHead.setFlipX(false);
            this.snakeHead.setAngle(-90);
        }
        else if (this.direction === 'down') {
            this.snakeHead.y += this.movingSpeed;
            this.snakeHead.setFlipX(false);
            this.snakeHead.setAngle(90);
        }
    }
    handleInput() {
        if (this.cursors.up.isDown && this.direction != 'down') {
            this.direction = 'up';
            this.currentFrame = 0;
            this.flipX = false;
            this.flipY = false;
        }
        else if (this.cursors.down.isDown && this.direction != 'up') {
            this.direction = 'down';
            this.currentFrame = 0;
            this.flipX = false;
            this.flipY = true;
        }
        else if (this.cursors.right.isDown && this.direction != 'left') {
            this.direction = 'right';
            this.currentFrame = 1;
            this.flipX = false;
            this.flipY = false;
        }
        else if (this.cursors.left.isDown && this.direction != 'right') {
            this.direction = 'left';
            this.currentFrame = 1;
            this.flipX = true;
            this.flipY = false;
        }
    }
    grow() {
        this.snakeBody.push(this.scene.add
            .image(this.lastPositionX, this.lastPositionY, 'player')
            .setOrigin(0.5, 0.5)
            .setFrame(this.currentFrame)
            .setFlipX(this.flipX)
            .setFlipY(this.flipY));
    }
}
