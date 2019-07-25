let speed = 5;
let cola = [];
let score = 0;

class Snake{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
    }
    show(){
        stroke(255,255,255);
        fill(0,255,0);
        rect(this.x,this.y,10,10);
    }
    update(){
        this.x += this.dx;
        this.y += this.dy;
        if(this.x > width){this.x = 0;}
        else if(this.x < 0){this.x = width;}
        else if(this.y > height){this.y = 0;}
        else if(this.y < 0){this.y = height;}
    }
}
class Comida{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    show(){
        fill(255,0,0);
        rect(this.x,this.y,10,10);
    }
    update(){
        if(snake.x == this.x && snake.y == this.y){
            this.x = int(random(0,30)) * 10;
            this.y = int(random(0,30)) * 10;
            score += 1;
        }
    }
}

function update(){
    if (snake.x == comida.x && snake.y == comida.y){
        cola.push(new Snake(0,0));
    }
    for(let i = cola.length; i === 0;i--){
        cola[i].update();
        cola[i].show();
    }
    noStroke();
    fill(255,255,0);
    text("Puntuacion: " + score,10,280);
    
}

function keyPressed(){
    switch(keyCode){
        case(UP_ARROW):
            snake.dy = -speed;
            snake.dx = 0;
            break;
        case(DOWN_ARROW):
            snake.dy = speed;
            snake.dx = 0;
            break;
        case(LEFT_ARROW):
            snake.dx = -speed;
            snake.dy = 0;
            break;
        case(RIGHT_ARROW):
            snake.dx = speed;
            snake.dy = 0;
            break;
    }
}

function setup(){
    createCanvas(300,300);
    snake = new Snake(0,0);
    comida = new Comida(0,0);
    cola.push(new Snake(0,0));
}

function draw(){
    background(0);
    snake.show();
    snake.update();
    comida.show();
    comida.update();
    update();
}
