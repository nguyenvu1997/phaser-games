import { BootScene } from "./Scenes/Boot.js";
import { GameScene } from "./Scenes/GamePlay.js";
const config = {
    type: Phaser.AUTO,
    width: 520,
    height: 700,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    backgroundColor: '#de3412',
    scene: [BootScene, GameScene]
};
let game = new Phaser.Game(config);
