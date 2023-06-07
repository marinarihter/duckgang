import {DIRECTION, textStyleKey, textStyleValue} from "./const.js";;
import {getTopScoreFromLocalStorage} from "./storage.js";

//creating variables
let gang, duck, squareSize, score, speed,
updateDelay, direction, newDirection,
gangDuckAddition, cursors, scoreTextValue, speedTextValue, topScoreTextValue

//creating game

const Game = {

    preload () {
        this.load.image('gang', './assets/images/bad-duck.png');
        this.load.image('duck', './assets/images/good-duck.png');
    },

    create () {

        //initialising variables

        gang = [];
        duck = {};
        squareSize = 50;
        score = 0;
        speed = 0;
        updateDelay = 0;
        direction = DIRECTION.RIGHT;
        newDirection = null;
        gangDuckAddition = false;

        // setting up a Phaser controller for keyboard input.
        cursors = this.input.keyboard.createCursorKeys();

        this.stage.backgroundColor = '#2B1764';

        // initial stack state
        for(let i = 0; i < 5; i++){
            gang[i] = this.add.sprite(200+i*squareSize, 200, 'gang');
        }

        // first duck adding
        this.generateDuck();

        // score
        this.add.text(50, 30, "SCORE", textStyleKey);
        scoreTextValue = this.add.text(170, 25, score.toString(), textStyleValue);

        // speed
        this.add.text(600, 30, "SPEED", textStyleKey);
        speedTextValue = this.add.text(715, 25, speed.toString(), textStyleValue);

        // top score
        let topScore = getTopScoreFromLocalStorage ();
        let displyedTopScore = topScore.toString();
        this.add.text(1100, 30, "TOP SCORE", textStyleKey);
        topScoreTextValue = this.add.text(1290, 25, displyedTopScore, textStyleValue);
        console.log (topScoreTextValue)
    },
    //moving

    update () {

        //wrong direction movement prevention

        if (cursors.right.isDown && direction!== DIRECTION.LEFT)
        {
            newDirection = DIRECTION.RIGHT;
        }
        else if (cursors.left.isDown && direction!=DIRECTION.RIGHT)
        {
            newDirection = DIRECTION.LEFT;
        }
        else if (cursors.up.isDown && direction!=DIRECTION.DOWN)
        {
            newDirection = DIRECTION.UP;
        }
        else if (cursors.down.isDown && direction!=DIRECTION.UP)
        {
            newDirection = DIRECTION.DOWN;
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
            if(newDirection){
                direction = newDirection;
                newDirection = null;
            }
    
            // change the last cell's coordinates
    
            if(direction == DIRECTION.RIGHT){
    
                lastCell.x = firstCell.x + 50;
                lastCell.y = firstCell.y;
                if(this.isOutside) lastCell.x = this.world.bounds.x; 
            }
            else if(direction == DIRECTION.LEFT){
                lastCell.x = firstCell.x - 50;
                lastCell.y = firstCell.y;
                if(this.isOutside) lastCell.x = this.world.bounds.width - 50;
            }
            else if(direction == DIRECTION.UP){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 50;
                if(this.isOutside) lastCell.y = this.world.bounds.height - 50;
            }
            else if(direction == DIRECTION.DOWN){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 50;
                if(this.isOutside) lastCell.y = this.world.bounds.y;
            }
            gang.push(lastCell);
            firstCell = lastCell;
        
            if(gangDuckAddition){
                gang.unshift(this.add.sprite(oldLastCellx, oldLastCelly, 'gang'));
                gangDuckAddition = false;
            }

            this.duckCollision();

            this.selfCollision(firstCell);

            this.checkOutside(firstCell);
        }

    },
    // new duck spawn
    generateDuck () {
        let randomX = Math.floor(Math.random() * 28) * squareSize,
            randomY = Math.floor(Math.random() * 20) * squareSize;
       
        duck = this.add.sprite(randomX, randomY, 'duck');
    },

    duckCollision () {
        for(let i = 0; i < gang.length; i++){
            if(gang[i].x == duck.x && gang[i].y == duck.y){
    
                gangDuckAddition = true;

                duck.destroy();

                this.generateDuck();
    
                score++;

                scoreTextValue.text = score.toString();
                }
            }    
    },
    
    selfCollision (head) {

        for(let i = 0; i < gang.length - 1; i++){
            if(head.x == gang[i].x && head.y == gang[i].y){
                this.state.start('GameOver');
            }
        }
    
    },
    
    checkOutside (head) {
        
        if(head.x >= 1440 || head.x < 0 || head.y >= 1080 || head.y < 0){
            this.isOutside = true;
        } else {
        this.isOutside = false;
        }
    }
};

export { Game, score };