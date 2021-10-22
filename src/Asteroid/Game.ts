import { GamePlay } from "./Scenes/GamePlay.js";
import { MainMenu } from "./Scenes/MainMenu.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    backgroundColor: '#000000',
    scene: [MainMenu, GamePlay]
}

let game = new Phaser.Game(config);