export interface IBlockConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    type: number;
}

export interface ICursorConstructor {
    scene: Phaser.Scene;
    x: number;
    y: number;
    texture: string;
    alpha?: number;
    frame?: string | number;
    cursorStartPosition: any;
}
