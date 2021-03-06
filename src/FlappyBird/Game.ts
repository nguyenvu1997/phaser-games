import { GamePlay } from "../FlappyBird/Scenes/GamePlay.js";
import { MainMenu } from "../FlappyBird/Scenes/MainMenu.js";
import { Preload } from "../FlappyBird/Scenes/Preload.js";

const config = {
    type: Phaser.AUTO,
    width: 390,
    height: 600,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [Preload, GamePlay, MainMenu]
}

let game = new Phaser.Game(config);