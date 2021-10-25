import { GamePlay } from "./Scenes/GamePlay.js";

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    backgroundColor: 0x4ac7ff,
    scene: [GamePlay]
}

let game = new Phaser.Game(config);