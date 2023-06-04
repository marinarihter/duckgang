//creating variables

let gang, duck, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

//creating game

let Game = {

    preload : function() {
        game.load.image('gang', './assets/images/bad-duck.png');
        game.load.image('duck', './assets/images/good-duck.png');
    },

    create : function() {

        //initialising variables

        gang = [];
        duck = {};
        squareSize = 50;
        score = 0;
        speed = 0;
        updateDelay = 0;
        direction = 'right';
        new_direction = null;
        addNew = false;

        // setting up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#2B1764';

        // initial stack state
        for(let i = 0; i < 5; i++){
            gang[i] = game.add.sprite(200+i*squareSize, 200, 'gang');
        }

        // first duck adding
        this.generateDuck();

        // text on the top
        textStyle_Key = { font: "bold 30px 'Irish Grover'", fill: "#FFE779", align: "center" };
        textStyle_Value = { font: "bold 40px 'Irish Grover'", fill: "#fff", align: "center" };

        // score
        game.add.text(50, 30, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(170, 25, score.toString(), textStyle_Value);

        // speed
        game.add.text(600, 30, "SPEED", textStyle_Key);
        speedTextValue = game.add.text(715, 25, speed.toString(), textStyle_Value);

        // top score

        let topScore = localStorage.getItem('topScore');
        if(topScore  === null) {
            localStorage.setItem('highscore', 0);    
            highScore = 0;}
        game.add.text(1100, 30, "TOP SCORE", textStyle_Key);
        topScoreTextValue = game.add.text(1280, 25, topScore.toString(), textStyle_Value);

    },
    //moving
    update: function() {

        //wrong direction movement prevention

        if (cursors.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }
    
        //speed 

        speed = Math.min(10, Math.floor(score/5));
        speedTextValue.text = '' + speed;

        updateDelay++;
    
        if (updateDelay % (10 - speed) == 0) {    
 
            let firstCell = gang[gang.length - 1],
                lastCell = gang.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;
    
            //change direction
            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }
    
            // change the last cell's coordinates
    
            if(direction == 'right'){
    
                lastCell.x = firstCell.x + 50;
                lastCell.y = firstCell.y;
                if(this.isOutside) lastCell.x = game.world.bounds.x; 
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - 50;
                lastCell.y = firstCell.y;
                if(this.isOutside) lastCell.x = game.world.bounds.width - 50;
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 50;
                if(this.isOutside) lastCell.y = game.world.bounds.height - 50;
            }
            else if(direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 50;
                if(this.isOutside) lastCell.y = game.world.bounds.y;
            }
            gang.push(lastCell);
            firstCell = lastCell;
        
            if(addNew){
                gang.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'gang'));
                addNew = false;
            }

            this.duckCollision();

            this.selfCollision(firstCell);

            this.wallCollision(firstCell);
        }

    },
    // new duck adding
    generateDuck: function(){
        let randomX = Math.floor(Math.random() * 25 ) * squareSize,
            randomY = Math.floor(Math.random() * 20 ) * squareSize;
       
        duck = game.add.sprite(randomX + 150, randomY, 'duck');
    },

    duckCollision: function() {
        for(let i = 0; i < gang.length; i++){
            if(gang[i].x == duck.x && gang[i].y == duck.y){
    
                addNew = true;

                duck.destroy();

                this.generateDuck();
    
                score++;

                scoreTextValue.text = score.toString();
                }
            }    
    },
    
    selfCollision: function(head) {

        for(let i = 0; i < gang.length - 1; i++){
            if(head.x == gang[i].x && head.y == gang[i].y){
                game.state.start('Game_Over');
            }
        }
    
    },
    
    wallCollision: function(head) {
        
        if(head.x >= 1440 || head.x < 0 || head.y >= 1080 || head.y < 0){
            this.isOutside = true;
        } else {
        this.isOutside = false;
        }
    }
};