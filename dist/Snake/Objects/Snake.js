import { CONST } from "../Const.js";
export class Snake {
    constructor(scene) {
        // set variables
        this.scene = scene;
        this.dotSize = CONST.FIELD_SIZE;
        this.snakeLength = 0;
        this.direction = 'right';
        this.dead = false;
        this.snakeBody = [];
        // input
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        // build snake
        this.buildSnake();
    }
    isDead() {
        return this.dead;
    }
    setDead(_dead) {
        this.dead = _dead;
    }
    getSnakeBody() {
        return this.snakeBody;
    }
    getHead() {
        return this.snakeBody[0];
    }
    getSnakeLength() {
        return this.snakeLength;
    }
    buildSnake() {
        let currentAlpha = 0;
        for (let i = 0; i <= this.snakeLength; i++) {
            if (i === 0) {
                currentAlpha = 1;
            }
            else {
                currentAlpha = 0.8;
            }
            this.snakeBody[i] = this.scene.add
                .graphics({
                x: 16 - i * this.dotSize,
                y: 16,
                fillStyle: { color: 0x61e85b, alpha: currentAlpha }
            })
                .fillRect(this.dotSize, this.dotSize, this.dotSize, this.dotSize);
        }
    }
    move() {
        // move body
        for (let i = this.snakeLength; i > 0; i--) {
            this.snakeBody[i].x = this.snakeBody[i - 1].x;
            this.snakeBody[i].y = this.snakeBody[i - 1].y;
        }
        // move head
        if (this.direction === 'left') {
            this.snakeBody[0].x -= this.dotSize;
        }
        else if (this.direction === 'right') {
            this.snakeBody[0].x += this.dotSize;
        }
        else if (this.direction === 'up') {
            this.snakeBody[0].y -= this.dotSize;
        }
        else if (this.direction === 'down') {
            this.snakeBody[0].y += this.dotSize;
        }
    }
    handleInput() {
        if (this.cursors.up.isDown && this.direction != 'down') {
            this.direction = 'up';
        }
        else if (this.cursors.down.isDown && this.direction != 'up') {
            this.direction = 'down';
        }
        else if (this.cursors.right.isDown && this.direction != 'left') {
            this.direction = 'right';
        }
        else if (this.cursors.left.isDown && this.direction != 'right') {
            this.direction = 'left';
        }
    }
    growSnake() {
        this.snakeLength++;
        this.snakeBody[this.snakeBody.length] = this.scene.add
            .graphics({
            x: this.snakeBody[this.snakeBody.length - 1].x,
            y: this.snakeBody[this.snakeBody.length - 1].y,
            fillStyle: { color: 0x61e85b, alpha: 0.8 }
        })
            .fillRect(this.dotSize, this.dotSize, this.dotSize, this.dotSize);
    }
    checkSnakeSnakeCollision() {
        for (let i = this.snakeLength; i > 0; i--) {
            if (this.snakeLength > 1 &&
                this.snakeBody[0].x === this.snakeBody[i].x &&
                this.snakeBody[0].y === this.snakeBody[i].y) {
                this.dead = true;
            }
        }
    }
}
