export const Menu = {

    preload () {
        this.load.image('menu', './assets/images/menu.png');
    },

    create () {
        this.add.button(0, 0, 'menu', this.startGame, this);
    },

    startGame () {
        this.state.start('Game');
    }

};

