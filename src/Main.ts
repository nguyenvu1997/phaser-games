/// <reference path="../node_modules/phaser/types/phaser.d.ts" />

import { CRGamePlay } from "./CoinRunner/Scenes/GamePlay.js";
import { GamePlay } from "./FlappyBird/Scenes/GamePlay.js";
import { MainMenu } from "./FlappyBird/Scenes/MainMenu.js";
import { Preload } from "./FlappyBird/Scenes/Preload.js";

const config = {
    type: Phaser.AUTO,
    width: 768,
    height: 576,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 830 },
            debug: true
        }
    },
    // scene: [Preload, GamePlay, MainMenu, CRGamePlay]
    scene: [CRGamePlay]
}

let game = new Phaser.Game(config);