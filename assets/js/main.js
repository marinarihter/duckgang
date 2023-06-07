import { Menu } from "./menu.js";
import { Game } from "./game.js";
import { GameOver } from "./gameOver.js";

const game = new Phaser.Game(1400, 1000, Phaser.AUTO, '');
game.state.add('Menu', Menu);

game.state.start('Menu');

game.state.add('Game', Game);
game.state.add('GameOver', GameOver);






  



