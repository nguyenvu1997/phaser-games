export interface IBulletConstructor {
    scene: Phaser.Scene;
    rotation: number;
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
