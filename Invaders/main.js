class Juego{
    constructor(){
        this.largo = 300;
        this.ancho = 300;
        this.velocidad = 3;
        this.columnaenemigos = 5;
        this.filadeenemigos = 3;
        this.direccion = false;
        this.enemigos = [];
    }
}

class Nave{
    constructor(){
        this.x = juego.largo / 2;
        this.y = juego.ancho - 30;
        this.dx = 0;
        this.largo = 20;
        this.ancho = 30;
        this.balas = [];
    }
    show(){
        this.x += this.dx;
        if(this.x + this.largo > juego.largo || this.x < 0){
            this.x += -this.dx;
        }
        rect(this.x,this.y,this.largo,this.ancho);
    }
}

class Enemigo{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.largo = 20;
        this.ancho = 20;
    }
    show(){
        fill(0,255,0);
        rect(this.x,this.y,this.largo,this.ancho);
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
        this.ancho = 20;
        this.hit = false;
    }
    show(){
        fill(255,0,0);
        rect(this.x,this.y,this.largo,this.ancho);
    }
    update(){
        this.y -= juego.velocidad; 
    }
}

function crearenemigos(){
    for(let j = 0; j < juego.filadeenemigos;j++){
        for(let i = 0; i < juego.columnaenemigos;i++){
            enemigo = new Enemigo( (i + 1) * 40, j * 30 );
            juego.enemigos.push(enemigo);
        }
    }
}

function disparar(){
    if(nave.balas.length > 0){
        for(let i in nave.balas){
            if(nave.balas[i].hit === true){
                nave.balas.splice(i,1);
            }
            else {
                nave.balas[i].update();
            }
        }
    }
}

function destruir(){
    for (let j = nave.balas.length - 1; j >= 0; j--) {
        for(let i in juego.enemigos){
            if(nave.balas[j].y < juego.enemigos[i].y + juego.enemigos[i].largo && 
                nave.balas[j].x < juego.enemigos[i].x + juego.enemigos[i].ancho &&
                nave.balas[j].x > juego.enemigos[i].x){
                nave.balas[j].hit = true;
                juego.enemigos.splice(i,1);
            }
        }
        if((nave.balas[j].y + nave.balas[j].largo) < 0){
            console.log("Bala eliminada");
            nave.balas[j].hit = true;
        }
    }
}

function actualizar(){
    background(0);
    nave.show();
    destruir();
    disparar();
    for (let i in juego.enemigos){
        juego.enemigos[i].show();
        juego.enemigos[i].update();
    }
    for(let j in nave.balas){
        nave.balas[j].show();
    }
    if(juego.enemigos.length > 0){
        if(juego.enemigos[0].x < 0 || 
            juego.enemigos[0].x + juego.enemigos[0].largo > juego.largo){
            juego.direccion = !juego.direccion;
        }
    }
    text("El numero de balas es: " + nave.balas.length,0,200);
    text("El numero de enemigos es: " + juego.enemigos.length,0,220);
}

function keyPressed(){
    if(keyCode == RIGHT_ARROW){
        nave.dx += juego.velocidad; 
    }
    else if(keyCode == LEFT_ARROW){
        nave.dx -= juego.velocidad;
    } 
    else if(keyCode == UP_ARROW){
        bala = new Bala();
        nave.balas.push(bala);
        for(let i = 0; i < nave.balas.length;i++){
            nave.balas[i].update();
        }
    }
}

function keyReleased(){
    if (key != ' ') {
        nave.dx = 0;
    }
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