import { BootScene } from "./Scenes/Boot.js";
import { GameScene } from "./Scenes/GamePlay.js";
import { HUDScene } from "./Scenes/Hud.js";
import { MenuScene } from "./Scenes/MainMenu.js";

const config = {
    type: Phaser.AUTO,
    width: 224,
    height: 240,
    zoom: 3,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    backgroundColor: '#f5cc69',
    scene: [BootScene, MenuScene, GameScene, HUDScene]
}

let game = new Phaser.Game(config);