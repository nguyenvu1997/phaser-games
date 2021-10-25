import { GameScene } from "./Scenes/GamePlay.js";
import { MenuScene } from "./Scenes/MainMenu.js";
const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1200,
    zoom: 0.6,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    backgroundColor: '#f5cc69',
    scene: [MenuScene, GameScene]
};
let game = new Phaser.Game(config);
