export class Menu extends Phaser.Scene {
    constructor() {
    super("Menu");
    }

    preload () {
        this.load.image('menu', './assets/images/menu.png');
    }

    create () {
        this.add.sprite(700, 500, 'menu')
        
        this.input.on("pointerdown", (pointer) => {
            this.scene.start("Game");
        });
    }
};

