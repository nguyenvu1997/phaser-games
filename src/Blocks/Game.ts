import { BootScene } from "./Scenes/Boot.js";
import { GamePlay } from "./Scenes/GamePlay.js";

const config = {
    type: Phaser.AUTO,
    width: 160,
    height: 144,
    parent: '',
    zoom: 3,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    backgroundColor: '#24232e',
    scene: [BootScene, GamePlay]
}

let game = new Phaser.Game(config);