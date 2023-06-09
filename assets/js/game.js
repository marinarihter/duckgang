import {DIRECTION, textStyleKey, textStyleValue, STORAGE_KEY} from "./const.js";

export class Game extends Phaser.Scene {
    gang = [];                    
    duck = {};                    
    squareSize = 50;               
    score = 0;
    speed = 0;    
    topScore = 0;                  
    updateDelay = 0; 
    direction = DIRECTION.RIGHT;          
    newDirection = null;       
    gangDuckAddition = false;
    cursors;
    scoreTextValue; 
    speedTextValue; 
    topScoreTextValue;

    constructor() {
        super("Game");
    }
        // game elements images

    preload () {
        this.load.image('gang', './assets/images/bad-duck.png');
        this.load.image('duck', './assets/images/good-duck.png');
    }

    create () {

        // setting up a Phaser controller for keyboard input.
        this.cursors = this.input.keyboard.createCursorKeys();

        // initial stack state
        for(let i = 0; i < 5; i++){
            this.gang[i] = this.add.sprite(200+i*this.squareSize, 200, 'gang');
        }

        // first duck adding
        this.generateDuck();

        // score
        this.add.text(50, 30, "SCORE", textStyleKey);
        this.scoreTextValue = this.add.text(170, 25, `${this.score}`, textStyleValue);

        // speed
        this.add.text(600, 30, "SPEED", textStyleKey);
        this.speedTextValue = this.add.text(715, 25, "0", textStyleValue);

        // top score

        this.topScore = localStorage.getItem(STORAGE_KEY) || 0;
        this.add.text(1100, 30, "TOP SCORE", textStyleKey);
        this.topScoreTextValue = this.add.text(1290, 25, `${this.topScore}`, textStyleValue)

    }

    //moving

    update () {

        //wrong direction movement prevention

        if (this.cursors.right.isDown && this.direction!== DIRECTION.LEFT)
        {
            this.newDirection = DIRECTION.RIGHT;
        }
        else if (this.cursors.left.isDown && this.direction!== DIRECTION.RIGHT)
        {
            this.newDirection = DIRECTION.LEFT;
        }
        else if (this.cursors.up.isDown && this.direction!== DIRECTION.DOWN)
        {
            this.newDirection = DIRECTION.UP;
        }
        else if (this.cursors.down.isDown && this.direction!== DIRECTION.UP)
        {
            this.newDirection = DIRECTION.DOWN;
        }
    
        //speed change
        
        this.speed = Math.min(10, Math.floor(this.score/5));
        this.speedTextValue.text = `${this.speed}`;

        this.updateDelay++;
    
        if (this.updateDelay % (10 - this.speed) === 0) {    
 
            let firstCell = this.gang[this.gang.length - 1];
            let lastCell = this.gang.shift();
            let oldLastCellx = lastCell.x;
            let oldLastCelly = lastCell.y;
    
            //change direction
            if(this.newDirection){
                this.direction = this.newDirection;
                this.newDirection = null;
            }
    
            // change the last cell's coordinates
    
            if(this.direction === DIRECTION.RIGHT){
    
                lastCell.x = firstCell.x + 50;
                lastCell.y = firstCell.y;
            }
            else if(this.direction === DIRECTION.LEFT){
                lastCell.x = firstCell.x - 50;
                lastCell.y = firstCell.y;
            }
            else if(this.direction === DIRECTION.UP){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 50;
            }
            else if(this.direction === DIRECTION.DOWN){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 50;
            }
            this.gang.push(lastCell);
            firstCell = lastCell;
        
            if(this.gangDuckAddition){
                this.gang.unshift(
                    this.add.sprite(oldLastCellx, oldLastCelly, 'gang'));
                this.gangDuckAddition = false;
            }

            this.duckCollision();
          
            this.checkOutside(firstCell);
            
            this.selfCollision(firstCell);
        }

    }
    // new duck spawn
    generateDuck () {
        let randomX = Math.floor(Math.random() * 28) * this.squareSize,
            randomY = Math.floor(Math.random() * 20) * this.squareSize;
       
            this.duck = this.add.sprite(randomX, randomY, 'duck');
    }

    duckCollision () {
        for(let i = 0; i < this.gang.length; i++){
            if(this.gang[i].x == this.duck.x && this.gang[i].y == this.duck.y){
    
                this.gangDuckAddition = true;

                this.duck.destroy();

                this.generateDuck();
    
                this.score++;

                this.scoreTextValue.text = `${this.score}`

                if (this.score > this.topScore) {
                    this.topScore = this.score;
                    this.topScoreTextValue.setText(this.topScore);
                    localStorage.setItem(STORAGE_KEY, this.topScore);
                }

                }
            }    
    }
    
    selfCollision (head) {

        for(let i = 0; i < this.gang.length - 1; i++){
            if(head.x == this.gang[i].x && head.y == this.gang[i].y){
                this.gang = [];
                this.scene.start("GameOver", { score: this.score });
            }
        }
    
    }
    
    checkOutside (head) {
        if (head.x > 1400) {
            head.x = 0
        }
    
        else if (head.x < 0) {
            head.x = 1400-50
        }
    
        else if (head.y >= 1000) {
            head.y = 0
        }
    
        else if (head.y < 0) {
            head.y = 1000-50
        }
    }
};
