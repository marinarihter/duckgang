import { Menu } from "./menu.js";
import { GameOver } from "./gameOver.js";
import { Game } from "./game.js";



const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 1000,
    backgroundColor: "#2B1764",
    scene: [Menu, Game, GameOver]
};

const game = new Phaser.Game(config);





  



