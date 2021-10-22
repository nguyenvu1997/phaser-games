/// <reference path="../../node_modules/phaser/types/phaser.d.ts" />
import { CRGamePlay } from "./Scenes/GamePlay.js";
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
    scene: [CRGamePlay]
};
let game = new Phaser.Game(config);
