let game;

game = new Phaser.Game(1440, 1024, Phaser.AUTO, '');
game.state.add('Menu', Menu);

game.state.start('Menu');

game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);






