class Juego{
    constructor(){
        this.largo = 400;
        this.ancho = 350;
        this.unidad = 30;
        this.velocidad = 3;
        this.columnaenemigos = 5;
        this.filadeenemigos = 3;
        this.balas = 2;
        this.puntuacion = 0;
        this.running = true;
        this.gameover = false;
        this.direccion = false;
        this.disparo = false;
        this.enemigos = [];
        this.sonido = new Audio("http://k007.kiwi6.com/hotlink/7di9miccg9/sfx_laser1.ogg");
    }
    show(){
        text("Puntuacion: " + this.puntuacion,10,300);
    }
}

class Bala{
    constructor(x,y,dir,imagen){
        this.x = x;
        this.y = y;
        this.largo = 5;
        this.ancho = 10;
        this.dir = dir;
        this.hit = false;
        this.out = false;
        this.imagen = imagen;
    }
    show(){
        image(this.imagen,this.x,this.y,this.largo,this.ancho);
    }
    update(){
        this.dir ? this.y -= juego.velocidad : this.y += juego.velocidad;
        this.y < 0 || this.y > juego.ancho ? this.out = true : this.out = false;
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
        this.laser = playerlaser;
    }
    show(){
        this.x += this.dx;
        if(this.x + this.largo > juego.largo || this.x < 0){
            this.x += -this.dx;
        }
        image(ship,this.x,this.y,this.largo,this.ancho);
    }
    disparar(){
        if(this.balas.length < juego.balas){
            this.balas.push(new Bala((this.x + this.largo / 2),this.y - this.ancho,true,this.laser));
            juego.sonido.play();
        }   
    }
}

class Enemigo{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.largo = juego.unidad;
        this.ancho = juego.unidad;
        this.caer = 10;
        this.balas = [];
        this.laser = enemylaser;
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
    disparar(){
        if(this.balas.length < juego.balas){
            this.balas.push(new Bala((this.x + this.largo / 2),this.y + this.ancho,false,this.laser));
            juego.sonido.play();
        }   
    }
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

function ordenar(array) {
  for(let i = 0; i < array.length; i++) {
    for(let j = 1; j < array.length; j++) {
      if(array[j - 1].x > array[j].x && array[j - 1].y < array[j].y) {
        swap(array, j - 1, j);
      }
    }
  }
  return array;
}
    
function rebotar_enemigos(){
    let primero = juego.enemigos[0];
    let ultimo = juego.enemigos[juego.enemigos.length - 1];
    
    if(primero.x < 0 || ultimo.x + ultimo.largo > juego.largo){
        juego.direccion = !juego.direccion;
        descender_enemigos();
    }
}

function descender_enemigos(){
    for (let i in juego.enemigos){
        juego.enemigos[i].y += juego.enemigos[i].caer;
    }
}

function disparo_enemigos(){
    if(frameCount % 60 === 0){
        let i = Math.round(random(0,juego.enemigos.length - 1));
        let enemigo = juego.enemigos[i];
        enemigo.disparar();
    }
}

function crear_enemigos(){
    for(let j = 0; j < juego.filadeenemigos;j++){
        for(let i = 0; i < juego.columnaenemigos;i++){
            
            let x = i * 40;
            let y = j * 34;
            
            enemigo = new Enemigo(x,y);
            juego.enemigos.push(enemigo);
        }
    }
}

function choque_jugador(i){
    let enemigo = juego.enemigos[i];
    if(enemigo.x > nave.x && enemigo.x < nave.x + nave.largo && enemigo.y + enemigo.ancho > nave.y){
        return true;
    }
}

function destruir_enemigo(i,j){
    let bala = nave.balas[j];
    let enemy = juego.enemigos[i];
    
    if(bala.x > enemy.x && bala.x < enemy.x + enemy.largo && bala.y > enemy.y && bala.y < enemy.y + enemy.ancho){
        juego.puntuacion += 1;
        return true;  
    }
}

function destruir_jugador(i,k){
    let bala = juego.enemigos[k].balas[i];
    
    if(bala.x > nave.x && bala.x < nave.x + nave.largo && bala.y > nave.y && bala.y < nave.y + nave.ancho){
        return true;  
    }
}

function limpiar_pantalla(){
    for(let i in juego.enemigos){
        if(choque_jugador(i)){
            juego.gameover = true;
        }
        
    }
    for(let k in juego.enemigos){
        for(let i in juego.enemigos[k].balas){
            if(destruir_jugador(i,k)){
                juego.gameover = true;
            }
        }
    }
    for(let j in nave.balas){
        for(let i in juego.enemigos){
            if(destruir_enemigo(i,j)){
                nave.balas[j].hit = true;
                juego.enemigos.splice(i,1);
                ordenar(juego.enemigos);
            }
        }
        if(nave.balas[j].hit === true || nave.balas[j].out === true){
            nave.balas.splice(j,1);
        }
        else if((nave.balas[j].y + nave.balas[j].largo) < 0){
            nave.balas[j].out = true;
        }
    }
}

function crear_nivel(){
    crear_enemigos();
}

function actualizar(){
    image(backgrounds,0,0,juego.largo,juego.ancho);
    if(!juego.gameover){
        if(juego.running){
            nave.show();
            juego.show();
            limpiar_pantalla();
            if(juego.enemigos.length > 0){
                rebotar_enemigos();
                disparo_enemigos();
            }
            else{crear_nivel()}
            for(let i in juego.enemigos){
                juego.enemigos[i].show();
                juego.enemigos[i].update();
                for(let k in juego.enemigos[i].balas){
                    juego.enemigos[i].balas[k].show();
                    juego.enemigos[i].balas[k].update();
                }
            }
            for(let j in nave.balas){
                nave.balas[j].show();
                nave.balas[j].update();
            }
        }
        else{
            text("En pausa",juego.largo / 2,juego.ancho / 2);
        }
    }
    else{
        text("Perdio ",juego.largo / 2,juego.ancho / 2);
        text("Puntuacion " + juego.puntuacion,juego.largo / 2,juego.ancho / 2 + 20);
    }
}
//--------------------------------------------------------------------
function touchStarted(){
    nave.disparar();
}

function touchMoved(){
    nave.x = mouseX;
}

function mouseMoved() {
    nave.x = mouseX;
}

function keyPressed(){
    switch(keyCode){
        case(RIGHT_ARROW):
            nave.dx += juego.velocidad;
            break;
        case(LEFT_ARROW):
            nave.dx -= juego.velocidad;
            break;
        case(UP_ARROW):
            nave.disparar();
            break;
        case(32): // Barra espaciadora
            juego.running = !juego.running;
            break;
    }
}

function keyReleased(){
    if (key != " ") {
        nave.dx = 0;
    }
}

function preload(){
    backgrounds = loadImage("https://i.ibb.co/k9QBgj7/purple.png");
    ship = loadImage("https://i.ibb.co/qWjf46n/player-Ship1-red.png");
    enemy = loadImage("https://i.ibb.co/9psQc0r/enemy-Green5.png");
    playerlaser = loadImage("https://i.ibb.co/F0bYvdD/laser-Red03.png");
    enemylaser = loadImage("https://i.ibb.co/ynnzchP/laser-Green05.png");
}

function setup(){
    juego = new Juego();
    nave = new Nave();
    crear_enemigos();
    createCanvas(juego.largo,juego.ancho);
}

function draw(){
    actualizar();
}

//------------------------------- Fin -------------------