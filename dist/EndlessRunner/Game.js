import { GamePlay } from "./Scenes/GamePlay.js";
const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: true
        }
    },
    backgroundColor: 0x4ac7ff,
    scene: [GamePlay]
};
let game = new Phaser.Game(config);
