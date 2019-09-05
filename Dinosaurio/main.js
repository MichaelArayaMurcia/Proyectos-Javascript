class Juego{
    constructor(){
        this.largo = 400;
        this.ancho = 300;
        this.gameover = false;
    }
}

class Base{
    constructor(){
        this.x = 0;
        this.y = juego.ancho - 30;
        this.largo = windowWidth;
        this.ancho = 60;
    }
}

class Jugador{
    constructor(){
        this.x = 20;
        this.y = base.y - 20;
        this.largo = 20;
        this.ancho = 20;
        this.gravedad = 0.6;
        this.fuerza = -12;
        this.dy = 0;
        this.saltando = false;
        
    }
    mostrar(){
        fill(0,255,0);
        rect(this.x,this.y,this.largo,this.ancho);
    }
    saltar(){
        if(!this.saltando){
            this.dy += this.fuerza;
        }
    }
    update(){
        this.dy += this.gravedad;
        this.y += this.dy;
        
        if(this.y + this.ancho < base.y){
            this.saltando = true;
        } else {
            this.saltando = false;
        }
        
        if(this.y + this.ancho > base.y){
            this.y = base.y - this.ancho;
            this.dy = 0;
        }
        if(this.y < 0){
            this.y = base.y - this.ancho;
            this.dy = 0;
        }
    }
    
}

class Obstaculo{
    constructor(){
        this.x = juego.largo;
        this.y = base.y - 20;
        this.largo = 20;
        this.ancho = 20;
        this.dx = 2.5;
    }
    mostrar(){
        fill(255,0,0);
        rect(this.x,this.y,this.largo,this.ancho);
    }
    chocar(){
    if(this.x < jugador.x + jugador.largo  && this.x + this.largo  > jugador.x &&
     this.y < jugador.y + jugador.ancho && this.y + this.ancho > jugador.y){
        return true;
        }    
    }
    update(){
        this.x -= this.dx;
        if(this.x < 0 - this.largo){
            this.x = juego.largo;
        }
    }
}

function verificar(){
    if(obstaculo.chocar()){
        juego.gameover = true;
    }
}

function actualizar(){
    background(0);
    image(bases,base.x,base.y,base.largo,base.ancho);
    if(!juego.gameover){
        jugador.mostrar();
        jugador.update();
        obstaculo.mostrar();
        obstaculo.update();
        verificar();
    }
    else{
        text("Perdio",juego.largo / 2,juego.ancho / 2);
    }
}

function keyPressed(){
    if(keyCode == UP_ARROW){
        jugador.saltar();
    }
}


function preload(){
    bases = loadImage('https://i.ibb.co/mzPj67g/base.png');
}

function setup(){
    juego = new Juego();
    base = new Base();
    jugador = new Jugador();
    obstaculo = new Obstaculo();
    createCanvas(juego.largo,juego.ancho);
}

function draw(){
    actualizar();
}