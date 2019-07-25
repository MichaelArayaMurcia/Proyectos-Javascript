class Ship{
    constructor(){
        this.x1 = 200;   //---- Punto izquierdo
        this.y1 = 390;
        
        this.x2 = 220;   //---- Punto medio 
        this.y2 = 340;
        
        this.x3 = 240;   //---- Punto derecho
        this.y3 = 390;
        
        this.dx = 0;     //---- Aceleración
    }
    show(){
        noStroke();
        fill(0,0,255);
        triangle(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3);
    }
    update(){
        this.x1 += this.dx;
        this.x2 += this.dx;
        this.x3 += this.dx;
    }
}

class Enemy{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.largo = 40;
        this.ancho = 10;
    }
    show(){
        noStroke();
        fill(0,255,255);
        rect(this.x,this.y,this.largo,this.ancho);
    }
}

class Bullet{
    constructor(){
        this.x = 100//ship.x2;
        this.y = 100//ship.y2;
        this.r = 5;
    }
    show(){
        noStroke();
        fill(255,255,0);
        ellipse(this.x,this.y,this.r,this.r);
    }
}

speed = 3;

function keyReleased(){ship.dx = 0;}

function keyPressed(){
    switch(keyCode){
        case(RIGHT_ARROW):
            ship.dx = speed;
            break;
        case(LEFT_ARROW):
            ship.dx = -speed;
            break;
        case(UP_ARROW):
            bullet.show();
            break;
    }
}

function setup(){
    createCanvas(400,400)
    ship = new Ship();
    enemy = new Enemy();
    bullet = new Bullet();
}

function draw(){
    background(0);
    ship.show();
    ship.update();
    enemy.show();
}