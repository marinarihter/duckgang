import { score } from "./game.js";
import { getTopScoreFromLocalStorage, setTopScoreIntoLocalStorage } from "./storage.js";;

export const GameOver = {

    preload () {
        this.load.image('gameover', './assets/images/gameover.png');
    },

    create () {

        this.add.button(0, 0, 'gameover', this.startGame, this);

        this.add.text(740, 100, score, { font: "bold 120px sans-serif", fill: "#fff", align: "center" });
        if (getTopScoreFromLocalStorage() === 0) {
        setTopScoreIntoLocalStorage ()};
    },

    startGame () {
        this.state.start('Game');
    }

};