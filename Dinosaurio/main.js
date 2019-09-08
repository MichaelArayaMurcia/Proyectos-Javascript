class Juego{
    constructor(){
        this.largo = 400;
        this.ancho = 300;
        this.vidas = 3;
        this.puntuacion = 0;
        this.record = 0;
        this.pausa = false;
        this.gameover = false;
        this.enemigos = [];
    }
}

class Base{
    constructor(x){
        this.x = x;
        this.y = juego.ancho - 30;
        this.largo = juego.largo;
        this.ancho = 60;
        this.dx = 2;
    }
    update(){
        this.x -= this.dx;
        if(this.x + this.largo < 0){
            this.x = juego.largo - 5;
        }
    }
}

class Jugador{
    constructor(){
        this.x = 20;
        this.ancho = 40;
        this.y = base1.y - this.ancho;
        this.largo = 25;
        this.gravedad = 0.6;
        this.fuerza = -12;
        this.dy = 0;
        this.saltando = false;
        
    }
    mostrar(){
        fill(0,255,0);
        image(player,this.x,this.y,this.largo,this.ancho);
    }
    saltar(){
        if(!this.saltando){
            this.dy += this.fuerza;
        }
    }
    update(){
        this.dy += this.gravedad;
        this.y += this.dy;
        
        if(this.y + this.ancho < base1.y){
            this.saltando = true;
        } else {
            this.saltando = false;
        }
        
        if(this.y + this.ancho > base1.y){
            this.y = base1.y - this.ancho;
            this.dy = 0;
        }
        if(this.y < 0){
            this.y = base1.y - this.ancho;
            this.dy = 0;
        }
    }
    
}

class Obstaculo{
    constructor(){
        this.x = juego.largo;
        this.ancho = 40;
        this.y = base1.y - this.ancho;
        this.largo = 25;
        this.dx = 4;
        this.imagen = null;
    }
    mostrar(){
        fill(255,0,0);
        image(this.imagen,this.x,this.y,this.largo,this.ancho);
    }
    chocar(){
    if(this.x < jugador.x + jugador.largo  && this.x + this.largo  > jugador.x &&
     this.y < jugador.y + jugador.ancho && this.y + this.ancho > jugador.y){
        return true;
        }    
    }
    update(){
        this.x -= this.dx;
    }
}

function touchStarted(){
    jugador.saltar();
}

function crear_enemigos(){
    obstaculo = new Obstaculo(); 
    let choice = Math.floor(random(0,3));
    if(choice === 0){
        obstaculo.imagen = spike;
    } 
    else if (choice === 1) {
        obstaculo.y = jugador.y - obstaculo.ancho;
        obstaculo.dx = 6;
        obstaculo.imagen = fly;
    } else {
        obstaculo.y = jugador.y - obstaculo.ancho;
        obstaculo.largo = 40;
        obstaculo.dx = 6;
        obstaculo.imagen = wings;    
    }
    juego.enemigos.push(obstaculo);
}

function manejo_enemigos(){
    for (let i in juego.enemigos) {
        enemigo = juego.enemigos[i];
        enemigo.mostrar();
        enemigo.update();
        if(enemigo.chocar()){
            juego.vidas -= 1;
            enemigo.x = -20;
            if(juego.puntuacion > juego.record){
                juego.record = juego.puntuacion;
            }
            juego.puntuacion = 0;
        }
        else if(enemigo.x < 0 - enemigo.largo){
            juego.puntuacion += 1;
            juego.enemigos.splice(i,1);
            crear_enemigos();
        }
    }
}

function perder(){
    if(juego.vidas === 0){
        juego.gameover = true;
    }
}

function actualizar(){
    image(fondo,0,0,juego.largo,juego.ancho);
    image(fondo2,0,0,juego.largo,juego.ancho);
    image(bases,base1.x,base1.y,base1.largo,base1.ancho);
    image(bases,base2.x,base2.y,base2.largo,base2.ancho);
    text("Puntuacion " + juego.puntuacion,10,20);
    text("Record: " + juego.record,200,20);
    for(let i = 0; i < juego.vidas; i++){
        let x = 300;
        image(corazones,x + i * 20,280,20,20);
    }
    if(!juego.gameover){
        if(!juego.pausa){
            jugador.mostrar();
            jugador.update();
            manejo_enemigos();
            base1.update();
            base2.update();
            perder();
        } else {
            text("Pausa",juego.largo / 2, 100);
        }
    }
    else{
        text("Perdio",juego.largo / 2,100);
    }
}

function keyPressed(){
    if(keyCode == UP_ARROW){
        jugador.saltar();
    }
    else if(keyCode == 32){
        juego.pausa = !juego.pausa;
    }
}

function preload(){
    bases = loadImage("https://i.ibb.co/mzPj67g/base.png");
    fondo = loadImage("https://i.ibb.co/Y8ytqJB/Nuvens.png");
    fondo2 = loadImage("https://i.ibb.co/MgNWtn8/Backgroud1.png");
    spike = loadImage("https://i.ibb.co/yWBfVMs/spike-Man-stand.png");
    fly = loadImage("https://i.ibb.co/Rg9KG0J/fly-Man-still-stand.png");
    wings = loadImage("https://i.ibb.co/GPGKvZh/wingMan2.png");
    player = loadImage("https://i.ibb.co/VpKLwrR/bunny1-stand.png");
    corazones = loadImage("https://i.ibb.co/m8wVTJY/60-Breakout-Tiles.png");
}

function setup(){
    juego = new Juego();
    base1 = new Base(0);
    base2 = new Base(juego.largo);
    jugador = new Jugador();
    crear_enemigos();
    createCanvas(juego.largo,juego.ancho);
}

function draw(){
    actualizar();
}