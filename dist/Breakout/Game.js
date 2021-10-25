import { GamePlay } from "./Scenes/GamePlay.js";
const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    backgroundColor: 0x262626,
    scene: [GamePlay]
};
let game = new Phaser.Game(config);
