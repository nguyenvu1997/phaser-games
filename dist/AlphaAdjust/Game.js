import { GamePlay } from "./Scenes/GamePlay.js";
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: '',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 830 },
            debug: true
        }
    },
    backgroundColor: '#1d2b53',
    scene: [GamePlay]
};
let game = new Phaser.Game(config);
