export class GameOver extends Phaser.Scene{
    constructor() {
        super("GameOver");
  }
    init(data) {
        this.score = data.score;
    }

    preload () {
        this.load.image('gameover', './assets/images/gameover.png');
    }

    create () {

        this.add.sprite(700, 500, 'gameover');

        this.add.text(740, 100, `${this.score}`,
                { font: "bold 120px sans-serif", fill: "#fff", align: "center" }
            );

        this.input.on("pointerdown", (pointer) => {
            this.scene.start("Game");
        });       
    }};