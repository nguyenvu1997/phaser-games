import { GamePlay } from "./Scenes/GamePlay.js";
import { MainMenuScene } from "./Scenes/MainMenu.js";
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 224,
    zoom: 3,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    backgroundColor: '#000000',
    scene: [MainMenuScene, GamePlay]
};
let game = new Phaser.Game(config);
