let Game_Over = {

    preload : function() {
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {

        this.add.button(0, 0, 'gameover', this.startGame, this);

        game.add.text(740, 100, score.toString(), { font: "bold 120px sans-serif", fill: "#fff", align: "center" });

        if(localStorage.getItem('topScore') === null){

            localStorage.setItem('topScore',score);
            
            }
            
            else if(score > localStorage.getItem('topScore')){
            
            localStorage.setItem('topScore',score);
            
        }

    },

    startGame: function () {
        this.state.start('Game');
    }

};