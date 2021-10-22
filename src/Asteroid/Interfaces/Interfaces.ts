export interface IBulletConstructor {
    scene: Phaser.Scene;
    rotation: number;
    options?: Phaser.Types.GameObjects.Graphics.Options;
}

export interface IAsteroidConstructor {
    scene: Phaser.Scene;
    size: number;
    options?: Phaser.Types.GameObjects.Graphics.Options;
}

export interface IGraphicsConstructor {
    scene: Phaser.Scene;
    options?: Phaser.Types.GameObjects.Graphics.Options;
}
