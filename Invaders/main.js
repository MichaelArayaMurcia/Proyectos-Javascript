class Juego{
    constructor(){
        this.largo = 350;
        this.ancho = 300;
        this.velocidad = 3;
        this.columnaenemigos = 5;
        this.filadeenemigos = 3;
        this.balas = 2;
        this.direccion = false;
        this.disparo = false;
        this.enemigos = [];
        this.unidad = 30;
        this.sonido = new Audio("http://k007.kiwi6.com/hotlink/7di9miccg9/sfx_laser1.ogg");
    }
}

class Nave{
    constructor(){
        this.x = juego.largo / 2;
        this.y = juego.ancho - juego.unidad;
        this.dx = 0;
        this.largo = juego.unidad;
        this.ancho = juego.unidad;
        this.balas = [];
    }
    show(){
        this.x += this.dx;
        if(this.x + this.largo > juego.largo || this.x < 0){
            this.x += -this.dx;
        }
        image(ship,this.x,this.y,this.largo,this.ancho);
    }
}

class Enemigo{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.largo = juego.unidad;
        this.ancho = juego.unidad;
    }
    show(){
        image(enemy,this.x,this.y,this.largo,this.ancho);
    }
    update(){
        if (juego.direccion === true){
            this.x += juego.velocidad;
        }
        else{
            this.x -= juego.velocidad;
        }
    }
}

class Bala{
    constructor(){
        this.x = nave.x + nave.largo / 2;
        this.y = nave.y - 20;
        this.largo = 5;
        this.ancho = 10;
        this.hit = false;
    }
    show(){
        image(laser,this.x,this.y,this.largo,this.ancho);
    }
    update(){
        this.y -= juego.velocidad; 
    }
}
function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

function ordenar(array) {
  for(var i = 0; i < array.length; i++) {
    for(var j = 1; j < array.length; j++) {
      if(array[j - 1].x > array[j].x && array[j - 1].y < array[j].y) {
        swap(array, j - 1, j);
      }
    }
  }
  return array;
}
    
function rebotar(){
    if(juego.enemigos[0].x < 0 || juego.enemigos[juego.enemigos.length - 1].x + juego.enemigos[juego.enemigos.length - 1].largo > juego.largo){
        juego.direccion = !juego.direccion;
    }
}

function crearenemigos(){
    for(let j = 0; j < juego.filadeenemigos;j++){
        for(let i = 0; i < juego.columnaenemigos;i++){
            enemigo = new Enemigo( (i + 1) * 40, j * 34 );
            juego.enemigos.push(enemigo);
        }
    }
}

function disparar(){
    if(nave.balas.length < juego.balas){
        bala = new Bala();
        nave.balas.push(bala);
        juego.sonido.play();
    }   
}

function destruir(){
    for(let j in nave.balas){
        for(let i in juego.enemigos){
            if(nave.balas[j].y < juego.enemigos[i].y + juego.enemigos[i].largo && 
                nave.balas[j].x < juego.enemigos[i].x + juego.enemigos[i].ancho &&
                nave.balas[j].x > juego.enemigos[i].x){
                nave.balas[j].hit = true;
                juego.enemigos.splice(i,1);
                ordenar(juego.enemigos);
            }
        }
        if((nave.balas[j].y + nave.balas[j].largo) < 0){
            nave.balas[j].hit = true;
        }
    }
    for(let j in nave.balas){
        if(nave.balas[j].hit === true){
            nave.balas.splice(j,1);
        }
    }
}

function actualizar(){
    image(backgrounds,0,0,juego.largo,juego.ancho);
    nave.show();
    destruir();
    if(juego.enemigos.length > 0){
    rebotar();
    }
    for (let i in juego.enemigos){
        juego.enemigos[i].show();
        juego.enemigos[i].update();
    }
    for(let j in nave.balas){
        nave.balas[j].show();
        nave.balas[j].update();
    }
}

function touchStarted(){
    disparar();
}

function touchMoved(){
    nave.x = mouseX;
}

function keyPressed(){
    if(keyCode == RIGHT_ARROW){
        nave.dx += juego.velocidad; 
    }
    else if(keyCode == LEFT_ARROW){
        nave.dx -= juego.velocidad;
    } 
    else if(keyCode == UP_ARROW){
        disparar();
    }
}

function keyReleased(){
    if (key != ' ') {
        nave.dx = 0;
    }
}

function preload(){
    backgrounds = loadImage("https://i.ibb.co/k9QBgj7/purple.png");
    ship = loadImage("https://i.ibb.co/qWjf46n/player-Ship1-red.png");
    enemy = loadImage("https://i.ibb.co/9psQc0r/enemy-Green5.png");
    laser = loadImage("https://i.ibb.co/F0bYvdD/laser-Red03.png");
}

function setup(){
    juego = new Juego();
    nave = new Nave();
    crearenemigos();
    createCanvas(juego.largo,juego.ancho);
}

function draw(){
    actualizar();
}
