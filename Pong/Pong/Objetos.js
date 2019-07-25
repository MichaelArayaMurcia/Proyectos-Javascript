let score1 = 0;
let score2 = 0;
let speed = 5;
class Pong{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.largo = 50;
    this.ancho = 10;
  }
}

class Ball{
  constructor(){
    this.x = 200;
    this.y = 180;
    this.xspeed = 3;
    this.yspeed = 2;
    this.r = 5;
  }
}
