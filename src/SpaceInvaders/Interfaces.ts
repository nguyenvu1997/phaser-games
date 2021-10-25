export interface IBulletConstructor {
    scene: Phaser.Scene;
    bulletProperties: { speed: number };
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
}

export interface IImageConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
}

export interface ISpriteConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    frame?: string | number;
}
