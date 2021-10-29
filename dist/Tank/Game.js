/// <reference path="../../node_modules/phaser3-nineslice/nineslice.d.ts" />
import { GameOver } from "./Scenes/GameOver.js";
import { GameScene } from "./Scenes/GamePlay.js";
import { MenuScene } from "./Scenes/MainMenu.js";
import { UI } from "./Scenes/UI.js";
const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1200,
    zoom: 0.6,
    parent: '',
    plugins: {
        global: [NineSlice.Plugin.DefaultCfg],
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    backgroundColor: '#f5cc69',
    scene: [MenuScene, GameScene, UI, GameOver]
};
let game = new Phaser.Game(config);
