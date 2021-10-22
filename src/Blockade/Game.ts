import { GamePlay } from "./Scenes/GamePlay.js";
import { MainMenu } from "./Scenes/MainMenu.js";

const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 224,
    zoom: 3,
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